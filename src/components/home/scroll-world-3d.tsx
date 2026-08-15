"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as THREE from "three";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/shared/magnetic-button";

/* ============================================================
   scroll-world — procedural Three.js fly-through (zero assets)
   One clay world in the Sunlit Workspace palette; scroll drives
   a camera along one continuous spline. No cuts, no seams.
   ============================================================ */

const BG = 0xfbf7ef;

const P = {
  ink: 0x2a241c,
  cream: 0xf3ead9,
  card: 0xfffdf8,
  orange: 0xc2571f,
  purple: 0x8a63d2,
  teal: 0x1f8a7c,
  muted: 0x8a7f6e,
  copper: 0xd98a4a,
  wood: 0x9a6b47,
  terra: 0xb96a3a,
  dark: 0x4a4238,
};

interface SectionSpec {
  id: string;
  accent: string;
  eyebrow: string;
  title: string;
  body: string;
  tags?: string[];
  cta?: boolean;
}

const sections: SectionSpec[] = [
  {
    id: "command-center",
    accent: "#c2571f",
    eyebrow: "The command center",
    title: "Every build starts at the desk.",
    body: "Full-stack & AI engineering, end to end — from the first terminal tab to the deploy. Scroll to fly through the work.",
    tags: ["Full-stack", "AI/ML", "SaaS"],
  },
  {
    id: "ai-lab",
    accent: "#8a63d2",
    eyebrow: "Privacy-first AI",
    title: "AI that never leaves the building.",
    body: "Cleanroom AI — a compliance-grade, on-premise Claude-style platform with federated learning, differential privacy, and an immutable audit log.",
    tags: ["Cleanroom AI", "FastAPI", "PyTorch"],
  },
  {
    id: "vision",
    accent: "#1f8a7c",
    eyebrow: "Computer vision",
    title: "Cameras that coach and classify.",
    body: "An in-browser calisthenics form coach and a real-time cognitive-state classifier — MoveNet, MediaPipe, and geometry rules, all running locally.",
    tags: ["Form Tracker", "RT-MBAS", "MediaPipe"],
  },
  {
    id: "saas",
    accent: "#c2571f",
    eyebrow: "Products, shipped",
    title: "From idea to paying users.",
    body: "Pressed, Futureproof, and Scrubbed — Stripe subscriptions, Supabase auth, in-browser IDEs, and LaTeX compiled to PDF in the browser.",
    tags: ["Pressed", "Futureproof", "Stripe"],
  },
  {
    id: "webloom",
    accent: "#8a63d2",
    eyebrow: "Webloom — client work",
    title: "50+ sites for real clients.",
    body: "Realtors, nonprofits, and product launches, shipped through Webloom on a self-defined Sunlit Workspace design system.",
    tags: ["50+ projects", "Design systems"],
  },
  {
    id: "signal",
    accent: "#1f8a7c",
    eyebrow: "Get in touch",
    title: "Let's build the next thing.",
    body: "Open to AI and full-stack roles, and to freelance work through Webloom.",
    cta: true,
  },
];

const N = sections.length;

/* ---------- material factory (the style preamble of 3D) ---------- */

const clayCache = new Map<number, THREE.MeshStandardMaterial>();
function clay(hex: number) {
  let m = clayCache.get(hex);
  if (!m) {
    m = new THREE.MeshStandardMaterial({ color: hex, roughness: 0.92, metalness: 0 });
    clayCache.set(hex, m);
  }
  return m;
}
function glow(hex: number, intensity = 1.4) {
  return new THREE.MeshBasicMaterial({ color: new THREE.Color(hex).multiplyScalar(intensity) });
}

function mesh(
  geo: THREE.BufferGeometry,
  mat: THREE.Material,
  x = 0,
  y = 0,
  z = 0,
  ry = 0
) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.rotation.y = ry;
  return m;
}

const box = (w: number, h: number, d: number) => new THREE.BoxGeometry(w, h, d);
const cyl = (r: number, h: number, s = 16) => new THREE.CylinderGeometry(r, r, h, s);

/* ---------- shared island base: clay slab + circuit traces ---------- */

function island(g: THREE.Group, w: number, d: number, seed = 1) {
  g.add(mesh(box(w, 1.1, d), clay(P.cream), 0, -0.55, 0));
  g.add(mesh(box(w + 1.4, 0.7, d + 1.4), clay(P.terra), 0, -1.35, 0));
  // copper traces: thin glowing strips wandering the floor
  let rng = seed;
  const rand = () => ((rng = (rng * 9301 + 49297) % 233280) / 233280);
  for (let i = 0; i < 7; i++) {
    const len = 2.5 + rand() * (w * 0.45);
    const t = mesh(
      box(len, 0.06, 0.14),
      glow(P.copper, 1.15),
      (rand() - 0.5) * (w - 3),
      0.02,
      (rand() - 0.5) * (d - 3),
      rand() > 0.5 ? Math.PI / 2 : 0
    );
    g.add(t);
    g.add(mesh(box(0.5, 0.22, 0.5), clay(P.dark), t.position.x + len / 2 - 0.3, 0.11, t.position.z));
  }
  // a few chips on the rim
  for (let i = 0; i < 4; i++) {
    g.add(
      mesh(
        box(1.1, 0.35, 1.1),
        clay([P.teal, P.purple, P.dark, P.cream][i]),
        (rand() - 0.5) * (w - 2.5),
        0.18,
        (rand() - 0.5) * (d - 2.5)
      )
    );
  }
}

function screenPanel(w: number, h: number, accent: number) {
  const g = new THREE.Group();
  g.add(mesh(box(w, h, 0.18), clay(P.dark)));
  g.add(mesh(box(w - 0.22, h - 0.22, 0.06), glow(accent, 0.55), 0, 0, 0.1));
  // "code lines"
  for (let i = 0; i < Math.floor(h * 3); i++) {
    const lw = (w - 0.6) * (0.35 + 0.55 * Math.abs(Math.sin(i * 2.7)));
    g.add(
      mesh(
        box(lw, 0.055, 0.02),
        glow([P.orange, P.purple, P.teal, 0xd8cdb8][i % 4], 1.5),
        -(w - 0.6) / 2 + lw / 2,
        h / 2 - 0.35 - i * 0.22,
        0.15
      )
    );
  }
  return g;
}

function figure(color: number, h = 1) {
  const g = new THREE.Group();
  g.add(mesh(new THREE.CapsuleGeometry(0.22 * h, 0.5 * h, 4, 8), clay(color), 0, 0.47 * h, 0));
  g.add(mesh(new THREE.SphereGeometry(0.18 * h, 16, 12), clay(0xf5ede0), 0, 1.05 * h, 0));
  return g;
}

function warmLight(g: THREE.Group, x: number, y: number, z: number, color = 0xffd9a8, i = 7) {
  const l = new THREE.PointLight(color, i, 20, 2);
  l.position.set(x, y, z);
  g.add(l);
}

/* ---------- the six scenes ---------- */

function buildCommandCenter(g: THREE.Group) {
  island(g, 16, 13, 3);
  // desk
  g.add(mesh(box(7, 0.4, 3), clay(P.wood), 0, 2.4, -1.5));
  [-3, 3].forEach((x) => g.add(mesh(box(0.4, 2.2, 2.6), clay(P.wood), x, 1.1, -1.5)));
  // monitors
  const m1 = screenPanel(2.2, 1.5, P.ink);
  m1.position.set(-2.1, 3.6, -2.1);
  m1.rotation.y = 0.35;
  const m2 = screenPanel(2.6, 1.7, P.ink);
  m2.position.set(0, 3.7, -2.4);
  const m3 = screenPanel(2.2, 1.5, P.ink);
  m3.position.set(2.1, 3.6, -2.1);
  m3.rotation.y = -0.35;
  g.add(m1, m2, m3);
  // keyboard, mug, chair, plant
  g.add(mesh(box(2.4, 0.14, 0.9), clay(0xe8ddc8), 0, 2.7, -0.7));
  g.add(mesh(cyl(0.28, 0.5), clay(P.orange), -2.6, 2.85, -0.7));
  const chair = new THREE.Group();
  chair.add(mesh(box(1.5, 0.25, 1.5), clay(P.teal), 0, 1.5, 0));
  chair.add(mesh(box(1.5, 1.7, 0.25), clay(P.teal), 0, 2.4, 0.72));
  chair.add(mesh(cyl(0.12, 1.5), clay(P.dark), 0, 0.75, 0));
  chair.position.set(0, 0, 1.2);
  g.add(chair);
  g.add(mesh(cyl(0.4, 0.7), clay(P.terra), 5.4, 0.35, -3.5));
  g.add(mesh(new THREE.SphereGeometry(0.75, 12, 10), clay(P.teal), 5.4, 1.3, -3.5));
  // bookshelf
  const shelf = new THREE.Group();
  shelf.add(mesh(box(2.6, 4.2, 1), clay(P.wood), 0, 2.1, 0));
  [0.9, 2.1, 3.3].forEach((y) =>
    [0, 1, 2].forEach((i) =>
      shelf.add(mesh(box(0.4, 0.85, 0.7), clay([P.orange, P.purple, P.teal][(i + Math.floor(y)) % 3]), -0.8 + i * 0.7, y, 0.1))
    )
  );
  shelf.position.set(-5.8, 0, -3.2);
  shelf.rotation.y = 0.5;
  g.add(shelf);
  warmLight(g, 0, 5, 0);
}

function buildAiLab(g: THREE.Group) {
  island(g, 16, 14, 7);
  // rows of racks
  [-1, 1].forEach((row) =>
    [-2, 0, 2].forEach((i) => {
      const rack = new THREE.Group();
      rack.add(mesh(box(1.5, 3.4, 1.1), clay(row < 0 ? P.dark : P.purple)));
      for (let y = 0; y < 5; y++)
        rack.add(
          mesh(box(1.2, 0.1, 0.06), glow(y % 2 ? P.teal : P.orange, 1.8), 0, -1.2 + y * 0.6, 0.58)
        );
      rack.position.set(i * 2.6, 1.7, row * 4.2);
      g.add(rack);
    })
  );
  // central glass enclosure
  const glass = new THREE.Mesh(
    box(2.6, 3.6, 2.6),
    new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1,
    })
  );
  glass.position.set(0, 1.9, 0);
  g.add(glass);
  const core = new THREE.Group();
  core.add(mesh(box(1.4, 3, 1.2), clay(P.dark)));
  for (let y = 0; y < 6; y++)
    core.add(mesh(box(1.1, 0.09, 0.06), glow(P.orange, 2), 0, -1.3 + y * 0.5, 0.62));
  core.position.set(0, 1.7, 0);
  g.add(core);
  g.add(mesh(new THREE.TorusGeometry(1.9, 0.07, 10, 40), glow(P.orange, 1.2), 0, 0.06, 0));
  warmLight(g, 0, 5.5, 0, 0xffd9a8, 6);
  warmLight(g, 0, 2.5, 4.5, 0x9adfd2, 3);
}

function buildVision(g: THREE.Group) {
  island(g, 17, 14, 11);
  // stage
  g.add(mesh(cyl(2.6, 0.35, 32), clay(P.dark), 0, 0.18, 0));
  g.add(mesh(new THREE.TorusGeometry(2.6, 0.06, 8, 48), glow(P.teal, 1.6), 0, 0.4, 0));
  const fig = figure(P.ink, 1.5);
  fig.position.set(0, 0.35, 0);
  g.add(fig);
  // screen wall
  const wall = new THREE.Group();
  const main = screenPanel(4.6, 2.6, P.teal);
  main.position.set(0, 3.6, 0);
  wall.add(main);
  const s1 = screenPanel(1.7, 1.3, P.purple);
  s1.position.set(-3.6, 3.9, 0.2);
  const s2 = screenPanel(1.7, 1.3, P.orange);
  s2.position.set(3.6, 3.9, 0.2);
  wall.add(s1, s2);
  wall.add(mesh(box(9.4, 5.4, 0.5), clay(P.cream), 0, 3.4, -0.4));
  wall.position.set(0, 0, -5.4);
  g.add(wall);
  // tripod cameras around the stage
  [[-3.4, 1.6, 0.5], [3.2, 2.2, -0.4], [0.2, 4, 2.6]].forEach(([x, z, ry]) => {
    const cam = new THREE.Group();
    [-0.3, 0, 0.3].forEach((o, i) =>
      cam.add(mesh(cyl(0.06, 1.8), clay(P.dark), o, 0.9, i === 2 ? 0.3 : -0.15))
    );
    cam.add(mesh(box(0.8, 0.55, 1), clay([P.orange, P.teal, P.purple][Math.abs(x) | 0 % 3]), 0, 2, 0));
    cam.add(mesh(cyl(0.18, 0.4), glow(P.ink, 0.4), 0, 2, 0.55));
    cam.position.set(x, 0, z);
    cam.rotation.y = ry as number;
    cam.lookAt(0, 1.4, 0);
    g.add(cam);
  });
  warmLight(g, 0, 5.5, 2, 0xffd9a8, 6);
}

function buildFactory(g: THREE.Group) {
  island(g, 18, 13, 17);
  // conveyor
  g.add(mesh(box(11, 0.5, 2.2), clay(P.dark), 0, 1.5, 0));
  for (let i = 0; i < 8; i++) {
    const r = mesh(cyl(0.22, 2.4), clay(P.cream), -4.9 + i * 1.4, 1.15, 0);
    r.rotation.x = Math.PI / 2;
    g.add(r);
  }
  [-4.5, -1.5, 1.5, 4.5].forEach((x) =>
    g.add(mesh(box(0.5, 1.1, 1.8), clay(P.terra), x, 0.55, 0))
  );
  // glowing app cards riding the belt
  [-3.5, -0.7, 2.2].forEach((x, i) => {
    const card = new THREE.Group();
    card.add(mesh(box(1.3, 0.9, 0.12), clay(P.card)));
    card.add(mesh(box(1.05, 0.16, 0.06), glow([P.orange, P.purple, P.teal][i], 1.6), 0, 0.22, 0.09));
    card.add(mesh(box(0.7, 0.1, 0.05), glow(P.ink, 0.5), -0.15, -0.05, 0.09));
    card.position.set(x, 2.2, 0);
    card.rotation.x = -0.25;
    g.add(card);
  });
  // robot arms
  [[-2.8, -1.9], [1, 1.9], [3.6, -1.9]].forEach(([x, z], i) => {
    const arm = new THREE.Group();
    arm.add(mesh(cyl(0.5, 0.5), clay(P.purple), 0, 0.25, 0));
    const seg1 = mesh(box(0.35, 2.2, 0.35), clay(P.cream), 0, 1.3, 0);
    seg1.rotation.z = 0.5 * (i % 2 ? -1 : 1);
    arm.add(seg1);
    const seg2 = mesh(box(0.28, 1.6, 0.28), clay([P.orange, P.teal, P.purple][i]), seg1.rotation.z * 1.8, 2.6, 0);
    seg2.rotation.z = -0.9 * (i % 2 ? -1 : 1);
    arm.add(seg2);
    arm.position.set(x, 0, z);
    g.add(arm);
  });
  // launch pad + rocket
  const rocket = new THREE.Group();
  rocket.add(mesh(cyl(1.6, 0.4, 24), clay(P.dark), 0, 0.2, 0));
  rocket.add(mesh(cyl(0.45, 1.6), clay(P.card), 0, 1.6, 0));
  rocket.add(mesh(new THREE.ConeGeometry(0.45, 0.8, 16), clay(P.orange), 0, 2.8, 0));
  rocket.add(mesh(new THREE.ConeGeometry(0.5, 0.7, 12), glow(P.copper, 1.8), 0, 0.55, 0));
  rocket.position.set(6.4, 0, -3.4);
  g.add(rocket);
  warmLight(g, 0, 5, 0);
}

function buildStudio(g: THREE.Group) {
  island(g, 16, 13, 23);
  // gallery wall of little site screens
  const wall = new THREE.Group();
  wall.add(mesh(box(10, 5.6, 0.5), clay(P.cream), 0, 3.2, -0.35));
  for (let r = 0; r < 2; r++)
    for (let c = 0; c < 3; c++) {
      const fr = screenPanel(1.9, 1.35, [P.orange, P.purple, P.teal][(r + c) % 3]);
      fr.position.set(-3 + c * 3, 4.4 - r * 1.9, 0.05);
      wall.add(fr);
    }
  wall.position.set(0, 0, -4.9);
  g.add(wall);
  // drafting table
  const table = new THREE.Group();
  const top = mesh(box(3.4, 0.2, 2.2), clay(P.wood), 0, 2.3, 0);
  top.rotation.x = -0.28;
  table.add(top);
  table.add(mesh(box(2.6, 0.06, 1.6), glow(0xfff4dd, 1), 0, 2.44, -0.1));
  [-1.4, 1.4].forEach((x) => table.add(mesh(box(0.3, 2.2, 1.8), clay(P.wood), x, 1.1, 0)));
  table.position.set(-1.2, 0, -0.5);
  g.add(table);
  // easel
  const easel = new THREE.Group();
  const board = screenPanel(1.8, 2.2, P.purple);
  board.position.set(0, 2.5, 0.15);
  easel.add(board);
  [[-0.7, 0.12], [0.7, 0.12], [0, -0.5]].forEach(([x, zt]) => {
    const leg = mesh(cyl(0.07, 3.6), clay(P.wood), x as number, 1.8, zt as number);
    leg.rotation.x = (zt as number) < 0 ? 0.25 : -0.08;
    easel.add(leg);
  });
  easel.position.set(3.8, 0, -1.6);
  easel.rotation.y = -0.4;
  g.add(easel);
  // armchair + plant + rug
  g.add(mesh(cyl(2.2, 0.06, 28), clay(P.purple), -4.2, 0.04, 2.2));
  const chair = new THREE.Group();
  chair.add(mesh(box(1.7, 0.5, 1.6), clay(P.orange), 0, 0.7, 0));
  chair.add(mesh(box(1.7, 1.2, 0.4), clay(P.orange), 0, 1.4, 0.6));
  [-0.75, 0.75].forEach((x) => chair.add(mesh(box(0.25, 0.9, 1.5), clay(P.terra), x, 0.9, 0)));
  chair.position.set(-4.2, 0, 2.2);
  chair.rotation.y = 0.7;
  g.add(chair);
  g.add(mesh(cyl(0.4, 0.7), clay(P.terra), 5.6, 0.35, 2.8));
  g.add(mesh(new THREE.SphereGeometry(0.8, 12, 10), clay(P.teal), 5.6, 1.4, 2.8));
  warmLight(g, 0, 5, 0.5);
}

function buildSignal(g: THREE.Group) {
  island(g, 18, 15, 31);
  // chip skyscraper with rooftop
  const bld = new THREE.Group();
  bld.add(mesh(box(5.4, 4.6, 5.4), clay(P.cream), 0, 2.3, 0));
  for (let i = 0; i < 6; i++) {
    bld.add(mesh(box(0.5, 4.2, 0.2), clay(P.purple), -2.2 + i * 0.9, 2.3, 2.75));
    bld.add(mesh(box(0.2, 4.2, 0.5), clay(P.purple), 2.75, 2.3, -2.2 + i * 0.9));
  }
  bld.add(mesh(box(0.3, 3.6, 0.1), glow(P.copper, 1.4), -2.72, 2.1, 1.2));
  bld.add(mesh(box(6, 0.4, 6), clay(P.terra), 0, 4.8, 0));
  g.add(bld);
  // rooftop furniture
  [[-1.6, 1.4], [1.6, 1.4]].forEach(([x, z]) => {
    g.add(mesh(box(0.9, 0.5, 0.9), clay(P.orange), x, 5.3, z));
    g.add(mesh(box(0.9, 0.7, 0.2), clay(P.orange), x, 5.6, z + 0.35));
  });
  g.add(mesh(cyl(0.5, 0.5, 20), clay(P.wood), 0, 5.3, 1.4));
  // antenna lattice
  const ant = new THREE.Group();
  [[-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5], [0.5, 0.5]].forEach(([x, z]) => {
    const leg = mesh(cyl(0.06, 4.6), clay(P.cream), x * 0.8, 2.3, z * 0.8);
    leg.rotation.x = -(z as number) * 0.16;
    leg.rotation.z = (x as number) * 0.16;
    ant.add(leg);
  });
  [1.2, 2.4, 3.6].forEach((y, i) => {
    const s = 0.75 - i * 0.18;
    ant.add(mesh(box(s * 2, 0.07, 0.07), clay(P.dark), 0, y, 0));
    ant.add(mesh(box(0.07, 0.07, s * 2), clay(P.dark), 0, y, 0));
  });
  ant.add(mesh(cyl(0.05, 1.6), clay(P.dark), 0, 5.2, 0));
  ant.add(mesh(new THREE.SphereGeometry(0.28, 16, 12), glow(P.teal, 2.4), 0, 6.1, 0));
  [0.8, 1.4].forEach((r, i) => {
    const ring = mesh(new THREE.TorusGeometry(r, 0.045, 8, 40), glow(P.teal, 1.6 - i * 0.5), 0, 6.1, 0);
    ring.rotation.x = Math.PI / 2;
    ant.add(ring);
  });
  ant.position.set(0, 5, 0);
  g.add(ant);
  // satellite dishes
  [[-2.2, -1.8, 0.7], [2.3, -2, -0.5]].forEach(([x, z, ry]) => {
    const d = new THREE.Group();
    d.add(mesh(cyl(0.08, 0.8), clay(P.dark), 0, 0.4, 0));
    const dish = mesh(new THREE.SphereGeometry(0.55, 16, 10, 0, Math.PI * 2, 0, 1), clay(P.card), 0, 0.95, 0);
    dish.rotation.x = -1;
    d.add(dish);
    d.position.set(x as number, 5, z as number);
    d.rotation.y = ry as number;
    g.add(d);
  });
  // envelopes spiraling up the beam
  for (let i = 0; i < 5; i++) {
    const a = i * 1.7;
    const env = mesh(box(0.5, 0.32, 0.04), clay(P.card), Math.cos(a) * (1 + i * 0.28), 6.6 + i * 1.15, Math.sin(a) * (1 + i * 0.28));
    env.rotation.set(0.4, a, 0.15);
    g.add(env);
  }
  // neighbor towers
  g.add(mesh(box(2, 5, 2), clay(P.purple), -6.4, 2.5, -3.4));
  g.add(mesh(box(1.6, 3.4, 1.6), clay(P.teal), 6.6, 1.7, -4));
  warmLight(g, 0, 7.5, 0, 0x9adfd2, 5);
  warmLight(g, 0, 5.8, 2, 0xffd9a8, 6);
}

const builders = [buildCommandCenter, buildAiLab, buildVision, buildFactory, buildStudio, buildSignal];

/* ---------- copy overlay (site design system) ---------- */

function SceneCopy({ s }: { s: SectionSpec }) {
  return (
    <div>
      <span className="mb-4 block text-xs uppercase tracking-[0.25em]" style={{ color: s.accent }}>
        {s.eyebrow}
      </span>
      <h3 className="font-display text-3xl font-bold leading-[1.05] text-[#2a241c] md:text-5xl">
        {s.title}
      </h3>
      <p className="mt-4 max-w-md text-base leading-relaxed text-[#6f6557] md:text-lg">{s.body}</p>
      {s.tags && (
        <div className="mt-5 flex flex-wrap gap-2">
          {s.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      )}
      {s.cta && (
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <MagneticButton>
            <Button asChild variant="accent" size="lg">
              <Link href="/work">View my work</Link>
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Get in touch</Link>
            </Button>
          </MagneticButton>
        </div>
      )}
    </div>
  );
}

/* ---------- main component ---------- */

export function ScrollWorld3D() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasHost = useRef<HTMLDivElement>(null);
  const copyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setFallback(true);
      return;
    }
    const host = canvasHost.current;
    const track = trackRef.current;
    if (!host || !track) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    } catch {
      setFallback(true);
      return;
    }
    const coarse = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarse ? 1.5 : 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(BG);
    scene.fog = new THREE.Fog(BG, 42, 110);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 300);

    // base light
    const hemi = new THREE.HemisphereLight(0xfff6e6, 0x7a6a55, 1.05);
    scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xffe6c4, 1.5);
    sun.position.set(30, 50, 25);
    scene.add(sun);

    // world layout: gentle arc
    const centers: THREE.Vector3[] = [];
    for (let i = 0; i < N; i++) {
      const pos = new THREE.Vector3(i * 52, 0, Math.sin(i * 0.85) * 16);
      centers.push(pos);
      const g = new THREE.Group();
      builders[i](g);
      g.position.copy(pos);
      g.rotation.y = Math.sin(i * 0.85) * -0.18;
      scene.add(g);
    }

    // camera rail: approach / interior / exit per scene
    const poses: { pos: THREE.Vector3; look: THREE.Vector3 }[] = [];
    for (let i = 0; i < N; i++) {
      const c = centers[i];
      const next = centers[Math.min(i + 1, N - 1)];
      const toNext = next.clone().sub(c).normalize();
      poses.push({
        pos: c.clone().add(new THREE.Vector3(-16, 15, 30)),
        look: c.clone().add(new THREE.Vector3(0, 2.5, 0)),
      });
      poses.push({
        pos: c.clone().add(new THREE.Vector3(-1.5, 5.2, 13.5)),
        look: c.clone().add(new THREE.Vector3(0, 3.2, -1)),
      });
      poses.push({
        pos: c.clone().add(new THREE.Vector3(12, 12, 22)).add(toNext.clone().multiplyScalar(8)),
        look: i === N - 1 ? c.clone().add(new THREE.Vector3(0, 4, 0)) : c.clone().lerp(next, 0.45).setY(4),
      });
    }
    // hold the final frame on the hero
    poses[poses.length - 1] = {
      pos: centers[N - 1].clone().add(new THREE.Vector3(2, 7, 17)),
      look: centers[N - 1].clone().add(new THREE.Vector3(0, 4.5, 0)),
    };
    const posSpline = new THREE.CatmullRomCurve3(poses.map((p) => p.pos), false, "centripetal");
    const lookSpline = new THREE.CatmullRomCurve3(poses.map((p) => p.look), false, "centripetal");

    const PN = poses.length;
    const interiorT = (i: number) => (3 * i + 1) / (PN - 1);

    let tTarget = 0;
    let tNow = 0;
    let raf = 0;
    let idle = 0;
    let lastActive = -1;

    const readScroll = () => {
      const r = track.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      tTarget = THREE.MathUtils.clamp(-r.top / Math.max(total, 1), 0, 1);
    };

    const size = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const tick = () => {
      idle += 0.008;
      tNow += (tTarget - tNow) * 0.1;
      const t = THREE.MathUtils.clamp(tNow, 0, 0.9999);
      camera.position.copy(posSpline.getPointAt(t));
      camera.position.y += Math.sin(idle) * 0.18; // idle micro-drift
      camera.lookAt(lookSpline.getPointAt(t));
      renderer.render(scene, camera);

      // copy band sync: nearest interior pose
      let active = 0;
      let best = Infinity;
      for (let i = 0; i < N; i++) {
        const d = Math.abs(t - interiorT(i));
        if (d < best) {
          best = d;
          active = i;
        }
      }
      if (active !== lastActive) {
        lastActive = active;
        copyRefs.current.forEach((el, i) => {
          if (!el) return;
          el.style.opacity = i === active ? "1" : "0";
          el.style.transform = i === active ? "translateY(0)" : "translateY(14px)";
          el.style.pointerEvents = i === active ? "auto" : "none";
        });
        dotRefs.current.forEach((el, i) => {
          if (!el) return;
          el.style.opacity = i === active ? "1" : "0.25";
          el.style.transform = i === active ? "scale(1.35)" : "scale(1)";
        });
      }
      raf = requestAnimationFrame(tick);
    };

    const onLost = (e: Event) => {
      e.preventDefault();
      setFallback(true);
    };

    size();
    readScroll();
    tNow = tTarget;
    window.addEventListener("scroll", readScroll, { passive: true });
    window.addEventListener("resize", size);
    renderer.domElement.addEventListener("webglcontextlost", onLost);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("resize", size);
      renderer.domElement.removeEventListener("webglcontextlost", onLost);
      renderer.dispose();
      host.removeChild(renderer.domElement);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
      });
      clayCache.forEach((mat) => mat.dispose());
      clayCache.clear();
    };
  }, []);

  if (fallback) {
    return (
      <section className="bg-[#fbf7ef] py-24">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-20 px-6 md:px-10">
          {sections.map((s) => (
            <SceneCopy key={s.id} s={s} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={trackRef} className="relative bg-[#fbf7ef]" style={{ height: `${N * 110}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div ref={canvasHost} className="absolute inset-0" />
        {/* copy overlay */}
        <div className="pointer-events-none absolute inset-0">
          <div className="mx-auto flex h-full w-full max-w-[1400px] items-end px-6 pb-20 md:items-center md:pb-0 md:px-10">
            <div className="relative w-full max-w-md">
              {sections.map((s, i) => (
                <div
                  key={s.id}
                  ref={(el) => {
                    copyRefs.current[i] = el;
                  }}
                  className="absolute bottom-0 w-full transition-all duration-500 ease-out md:bottom-auto md:top-1/2 md:-translate-y-1/2"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  <SceneCopy s={s} />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* dot rail */}
        <div className="absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 md:flex">
          {sections.map((s, i) => (
            <span
              key={s.id}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              className="h-2 w-2 rounded-full transition-all duration-300"
              style={{ backgroundColor: s.accent, opacity: i === 0 ? 1 : 0.25 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
