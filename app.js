// ../../mnt/user-data/outputs/trace-pc-builder.jsx
import React, { useState, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import {
  Cpu,
  Fan,
  CircuitBoard,
  MemoryStick,
  HardDrive,
  Zap,
  Box,
  Monitor,
  Layers,
  Droplet,
  Wind,
  AppWindow,
  Share2,
  Save,
  Check,
  AlertTriangle,
  X,
  ChevronRight,
  ChevronDown,
  Copy,
  Sparkles,
  Plus,
  Trash2,
  RotateCcw,
  Search,
  Gauge,
  FolderOpen
} from "lucide-react";
var DATA = {
  cpu: [
    { id: "cpu-r5-7600", brand: "AMD", name: "Ryzen 5 7600", socket: "AM5", cores: 6, threads: 12, tdp: 65, tier: "Budget", price: 16500 },
    { id: "cpu-i5-14600k", brand: "Intel", name: "Core i5-14600K", socket: "LGA1700", cores: 14, threads: 20, tdp: 125, tier: "Mainstream", price: 26e3 },
    { id: "cpu-r7-7800x3d", brand: "AMD", name: "Ryzen 7 7800X3D", socket: "AM5", cores: 8, threads: 16, tdp: 120, tier: "High-End", price: 38500 },
    { id: "cpu-i7-14700k", brand: "Intel", name: "Core i7-14700K", socket: "LGA1700", cores: 20, threads: 28, tdp: 125, tier: "High-End", price: 34500 },
    { id: "cpu-r7-9800x3d", brand: "AMD", name: "Ryzen 7 9800X3D", socket: "AM5", cores: 8, threads: 16, tdp: 120, tier: "Enthusiast", price: 48e3 },
    { id: "cpu-ultra9-285k", brand: "Intel", name: "Core Ultra 9 285K", socket: "LGA1851", cores: 24, threads: 24, tdp: 125, tier: "Enthusiast", price: 52e3 },
    { id: "cpu-r9-9950x3d", brand: "AMD", name: "Ryzen 9 9950X3D", socket: "AM5", cores: 16, threads: 32, tdp: 170, tier: "Enthusiast", price: 68e3 }
  ],
  cooler: [
    { id: "cool-ag400", brand: "DeepCool", name: "AG400", type: "Air", sockets: ["AM5", "AM4", "LGA1700", "LGA1851"], height: 155, tier: "Budget", price: 2200 },
    { id: "cool-ps120se", brand: "Thermalright", name: "Phantom Spirit 120 SE", type: "Air", sockets: ["AM5", "AM4", "LGA1700", "LGA1851"], height: 162, tier: "Mainstream", price: 3400 },
    { id: "cool-ag620g2", brand: "DeepCool", name: "AG620 G2", type: "Air", sockets: ["AM5", "AM4", "LGA1700", "LGA1851"], height: 160, tier: "Mainstream", price: 4200 },
    { id: "cool-afl3-360", brand: "Arctic", name: "Liquid Freezer III Pro 360", type: "AIO", sockets: ["AM5", "AM4", "LGA1700", "LGA1851"], radiator: 360, tier: "High-End", price: 12e3 },
    { id: "cool-h150i", brand: "Corsair", name: "iCUE LINK H150i", type: "AIO", sockets: ["AM5", "AM4", "LGA1700", "LGA1851"], radiator: 360, tier: "Enthusiast", price: 17500 }
  ],
  motherboard: [
    { id: "mb-b650mp", brand: "MSI", name: "PRO B650M-P", socket: "AM5", chipset: "B650", formFactor: "mATX", ramType: "DDR5", wifi: false, tier: "Budget", price: 10500 },
    { id: "mb-b650gpw", brand: "MSI", name: "B650 Gaming Plus WiFi", socket: "AM5", chipset: "B650", formFactor: "ATX", ramType: "DDR5", wifi: true, tier: "Mainstream", price: 15500 },
    { id: "mb-tufb650", brand: "ASUS", name: "TUF Gaming B650-PLUS WiFi", socket: "AM5", chipset: "B650", formFactor: "ATX", ramType: "DDR5", wifi: true, tier: "Mainstream", price: 19e3 },
    { id: "mb-gx650ax", brand: "Gigabyte", name: "B650 Gaming X AX", socket: "AM5", chipset: "B650", formFactor: "ATX", ramType: "DDR5", wifi: true, tier: "Mainstream", price: 18500 },
    { id: "mb-tomahawk", brand: "MSI", name: "MAG B650 Tomahawk WiFi", socket: "AM5", chipset: "B650", formFactor: "ATX", ramType: "DDR5", wifi: true, tier: "High-End", price: 22e3 },
    { id: "mb-z790p", brand: "MSI", name: "PRO Z790-P WiFi", socket: "LGA1700", chipset: "Z790", formFactor: "ATX", ramType: "DDR5", wifi: true, tier: "High-End", price: 21e3 },
    { id: "mb-z890p", brand: "ASUS", name: "Prime Z890-P WiFi", socket: "LGA1851", chipset: "Z890", formFactor: "ATX", ramType: "DDR5", wifi: true, tier: "Enthusiast", price: 26e3 }
  ],
  gpu: [
    { id: "gpu-4060", brand: "ASUS", name: "Dual RTX 4060 8GB", vram: 8, length: 220, tdp: 115, tier: "Budget", price: 29e3 },
    { id: "gpu-5070", brand: "ASUS", name: "TUF Gaming RTX 5070 12GB", vram: 12, length: 300, tdp: 250, tier: "Mainstream", price: 62e3 },
    { id: "gpu-5070ti-tuf", brand: "ASUS", name: "TUF Gaming RTX 5070 Ti 16GB", vram: 16, length: 305, tdp: 300, tier: "High-End", price: 115e3 },
    { id: "gpu-5070ti-zotac", brand: "Zotac", name: "Trinity RTX 5070 Ti 16GB", vram: 16, length: 315, tdp: 300, tier: "High-End", price: 11e4 },
    { id: "gpu-5070ti-msi", brand: "MSI", name: "Gaming Trio OC RTX 5070 Ti 16GB", vram: 16, length: 330, tdp: 300, tier: "High-End", price: 122e3 },
    { id: "gpu-5080", brand: "Gigabyte", name: "Gaming OC RTX 5080 16GB", vram: 16, length: 340, tdp: 360, tier: "Enthusiast", price: 155e3 }
  ],
  ram: [
    { id: "ram-ddr4-16", brand: "Corsair", name: "Vengeance 16GB (2x8) DDR4-3200 CL16", type: "DDR4", capacity: 16, speed: 3200, cl: 16, tier: "Budget", price: 3800 },
    { id: "ram-ddr5-16-5200", brand: "Corsair", name: "Vengeance 16GB (2x8) DDR5-5200 CL40", type: "DDR5", capacity: 16, speed: 5200, cl: 40, tier: "Budget", price: 5200 },
    { id: "ram-ddr5-32-6000kf", brand: "Kingston", name: "Fury Beast 32GB (2x16) DDR5-6000 CL36", type: "DDR5", capacity: 32, speed: 6e3, cl: 36, tier: "Mainstream", price: 12500 },
    { id: "ram-ddr5-32-6000gs", brand: "G.Skill", name: "Ripjaws S5 32GB (2x16) DDR5-6000 CL30", type: "DDR5", capacity: 32, speed: 6e3, cl: 30, tier: "High-End", price: 14e3 },
    { id: "ram-ddr5-32-6000tz", brand: "G.Skill", name: "Trident Z5 RGB 32GB (2x16) DDR5-6000 CL30", type: "DDR5", capacity: 32, speed: 6e3, cl: 30, tier: "High-End", price: 16500 },
    { id: "ram-ddr5-64-6000", brand: "Corsair", name: "Vengeance 64GB (2x32) DDR5-6000 CL30", type: "DDR5", capacity: 64, speed: 6e3, cl: 30, tier: "Enthusiast", price: 28e3 }
  ],
  storage: [
    { id: "ssd-p3-1tb", brand: "Crucial", name: "P3 1TB NVMe Gen3", type: "NVMe Gen3", capacity: 1024, tier: "Budget", price: 5200 },
    { id: "hdd-bcd-2tb", brand: "Seagate", name: "Barracuda 2TB HDD", type: "SATA HDD", capacity: 2048, tier: "Budget", price: 4500 },
    { id: "ssd-sn770-1tb", brand: "WD", name: "Black SN770 1TB NVMe Gen4", type: "NVMe Gen4", capacity: 1024, tier: "Mainstream", price: 7e3 },
    { id: "ssd-sn850x-2tb", brand: "WD", name: "Black SN850X 2TB NVMe Gen4", type: "NVMe Gen4", capacity: 2048, tier: "High-End", price: 13500 },
    { id: "ssd-990pro-2tb", brand: "Samsung", name: "990 Pro 2TB NVMe Gen4", type: "NVMe Gen4", capacity: 2048, tier: "High-End", price: 14e3 },
    { id: "ssd-t700-2tb", brand: "Crucial", name: "T700 2TB NVMe Gen5", type: "NVMe Gen5", capacity: 2048, tier: "Enthusiast", price: 18500 }
  ],
  psu: [
    { id: "psu-a550bn", brand: "MSI", name: "MAG A550BN 550W", wattage: 550, efficiency: "80+ Bronze", modular: false, tier: "Budget", price: 3800 },
    { id: "psu-cv650", brand: "Corsair", name: "CV650 650W", wattage: 650, efficiency: "80+ Bronze", modular: false, tier: "Budget", price: 4800 },
    { id: "psu-a750gl", brand: "MSI", name: "MAG A750GL 750W", wattage: 750, efficiency: "80+ Gold", modular: true, tier: "Mainstream", price: 7200 },
    { id: "psu-rm850x", brand: "Corsair", name: "RM850x 850W", wattage: 850, efficiency: "80+ Gold", modular: true, tier: "High-End", price: 10500 },
    { id: "psu-rm1000x", brand: "Corsair", name: "RM1000x 1000W", wattage: 1e3, efficiency: "80+ Gold", modular: true, tier: "Enthusiast", price: 15e3 },
    { id: "psu-tx1300", brand: "Seasonic", name: "Prime TX-1300 1300W", wattage: 1300, efficiency: "80+ Titanium", modular: true, tier: "Enthusiast", price: 28e3 }
  ],
  cabinet: [
    { id: "case-ice130", brand: "Ant Esports", name: "ICE-130TG", formFactors: ["mATX", "ITX"], maxGpuLength: 300, maxCoolerHeight: 155, radiatorSupport: [240], tier: "Budget", price: 3200 },
    { id: "case-air100", brand: "Montech", name: "Air 100", formFactors: ["ATX", "mATX", "ITX"], maxGpuLength: 360, maxCoolerHeight: 165, radiatorSupport: [240, 280], tier: "Budget", price: 4500 },
    { id: "case-4000d", brand: "Corsair", name: "4000D Airflow", formFactors: ["ATX", "mATX", "ITX"], maxGpuLength: 360, maxCoolerHeight: 170, radiatorSupport: [240, 280, 360], tier: "Mainstream", price: 8800 },
    { id: "case-popair", brand: "Fractal Design", name: "Pop Air", formFactors: ["ATX", "mATX", "ITX"], maxGpuLength: 400, maxCoolerHeight: 170, radiatorSupport: [240, 280, 360], tier: "Mainstream", price: 8200 },
    { id: "case-ch560", brand: "DeepCool", name: "CH560", formFactors: ["ATX", "mATX", "ITX"], maxGpuLength: 410, maxCoolerHeight: 175, radiatorSupport: [240, 280, 360], tier: "High-End", price: 6800 },
    { id: "case-lancool216", brand: "Lian Li", name: "Lancool 216", formFactors: ["ATX", "mATX", "ITX"], maxGpuLength: 392, maxCoolerHeight: 180, radiatorSupport: [240, 280, 360], tier: "High-End", price: 9500 }
  ],
  fans: [
    { id: "fan-sickleflow", brand: "Cooler Master", name: "SickleFlow 120 (single)", size: 120, count: 1, argb: false, tier: "Budget", price: 500 },
    { id: "fan-fc120-3", brand: "DeepCool", name: "FC120 ARGB (3-pack)", size: 120, count: 3, argb: true, tier: "Mainstream", price: 2400 },
    { id: "fan-ll120-2", brand: "Corsair", name: "LL120 RGB (2-pack)", size: 120, count: 2, argb: true, tier: "High-End", price: 5500 },
    { id: "fan-unisl-3", brand: "Lian Li", name: "UNI FAN SL120 ARGB (3-pack)", size: 120, count: 3, argb: true, tier: "High-End", price: 4800 }
  ],
  paste: [
    { id: "paste-mgm", brand: "Cooler Master", name: "MasterGel Maker", tier: "Budget", price: 500 },
    { id: "paste-mx6", brand: "Arctic", name: "MX-6", tier: "Mainstream", price: 650 },
    { id: "paste-nth2", brand: "Noctua", name: "NT-H2", tier: "Mainstream", price: 800 },
    { id: "paste-kryonaut", brand: "Thermal Grizzly", name: "Kryonaut", tier: "High-End", price: 950 }
  ],
  monitor: [
    { id: "mon-vg249", brand: "ASUS", name: "TUF VG249Q3A 24\u2033 180Hz IPS FHD", size: 24, resolution: "1920x1080", refresh: 180, tier: "Budget", price: 14500 },
    { id: "mon-27gp850", brand: "LG", name: "27GP850 27\u2033 165Hz QHD", size: 27, resolution: "2560x1440", refresh: 165, tier: "Mainstream", price: 26e3 },
    { id: "mon-odysseyg7", brand: "Samsung", name: "Odyssey G7 32\u2033 240Hz QHD", size: 32, resolution: "2560x1440", refresh: 240, tier: "High-End", price: 42e3 },
    { id: "mon-pg27aqdm", brand: "ASUS", name: "ROG Swift PG27AQDM 27\u2033 OLED 240Hz QHD", size: 27, resolution: "2560x1440", refresh: 240, tier: "Enthusiast", price: 68e3 }
  ],
  os: [
    { id: "os-none", brand: "\u2014", name: "No OS (bring your own)", tier: "Budget", price: 0 },
    { id: "os-w11h", brand: "Microsoft", name: "Windows 11 Home (OEM)", tier: "Mainstream", price: 8500 },
    { id: "os-w11p", brand: "Microsoft", name: "Windows 11 Pro (OEM)", tier: "High-End", price: 15500 }
  ]
};
var CATEGORIES = [
  { id: "cpu", label: "Processor", short: "CPU", icon: Cpu, required: true },
  { id: "cooler", label: "CPU Cooler", short: "Cooler", icon: Fan, required: true },
  { id: "motherboard", label: "Motherboard", short: "Mobo", icon: CircuitBoard, required: true },
  { id: "gpu", label: "Graphics Card", short: "GPU", icon: Layers, required: true },
  { id: "ram", label: "Memory", short: "RAM", icon: MemoryStick, required: true },
  { id: "storage", label: "Storage", short: "Storage", icon: HardDrive, required: true },
  { id: "psu", label: "Power Supply", short: "PSU", icon: Zap, required: true },
  { id: "cabinet", label: "Cabinet", short: "Case", icon: Box, required: true },
  { id: "fans", label: "Case Fans", short: "Fans", icon: Wind, required: false },
  { id: "paste", label: "Thermal Paste", short: "Paste", icon: Droplet, required: false },
  { id: "monitor", label: "Monitor", short: "Display", icon: Monitor, required: false },
  { id: "os", label: "Operating System", short: "OS", icon: AppWindow, required: false }
];
var REQUIRED_IDS = CATEGORIES.filter((c) => c.required).map((c) => c.id);
var INR = (n) => "\u20B9" + Number(n || 0).toLocaleString("en-IN");
function buildIssues(sel) {
  const issues = [];
  const { cpu, cooler, motherboard, gpu, ram, cabinet, psu } = sel;
  if (cpu && motherboard && cpu.socket !== motherboard.socket) {
    issues.push({
      level: "error",
      cats: ["cpu", "motherboard"],
      text: `${cpu.name} needs a ${cpu.socket} board \u2014 ${motherboard.name} is ${motherboard.socket}.`
    });
  }
  if (cpu && cooler && !cooler.sockets.includes(cpu.socket)) {
    issues.push({
      level: "error",
      cats: ["cooler", "cpu"],
      text: `${cooler.name} doesn't list ${cpu.socket} support.`
    });
  }
  if (motherboard && ram && motherboard.ramType !== ram.type) {
    issues.push({
      level: "error",
      cats: ["motherboard", "ram"],
      text: `${motherboard.name} takes ${motherboard.ramType} \u2014 ${ram.name} is ${ram.type}.`
    });
  }
  if (motherboard && cabinet && !cabinet.formFactors.includes(motherboard.formFactor)) {
    issues.push({
      level: "error",
      cats: ["cabinet", "motherboard"],
      text: `${cabinet.name} doesn't fit a ${motherboard.formFactor} board.`
    });
  }
  if (gpu && cabinet && gpu.length > cabinet.maxGpuLength) {
    issues.push({
      level: "error",
      cats: ["gpu", "cabinet"],
      text: `${gpu.name} is ${gpu.length}mm \u2014 ${cabinet.name} clears only ${cabinet.maxGpuLength}mm.`
    });
  }
  if (cooler && cooler.type === "Air" && cabinet && cooler.height > cabinet.maxCoolerHeight) {
    issues.push({
      level: "error",
      cats: ["cooler", "cabinet"],
      text: `${cooler.name} is ${cooler.height}mm tall \u2014 ${cabinet.name} clears only ${cabinet.maxCoolerHeight}mm.`
    });
  }
  if (cooler && cooler.type === "AIO" && cabinet && !cabinet.radiatorSupport.includes(cooler.radiator)) {
    issues.push({
      level: "warn",
      cats: ["cooler", "cabinet"],
      text: `Double-check ${cabinet.name} has a ${cooler.radiator}mm radiator mount.`
    });
  }
  const draw = (cpu?.tdp || 0) + (gpu?.tdp || 0) + 120;
  const recommended = Math.ceil(draw * 1.3 / 50) * 50;
  if (psu && draw > 120 && psu.wattage < draw * 1.15) {
    issues.push({
      level: "error",
      cats: ["psu"],
      text: `Estimated draw ~${draw}W is too close to the ${psu.wattage}W rating. Pick ${recommended}W+.`
    });
  } else if (psu && draw > 120 && psu.wattage < recommended) {
    issues.push({
      level: "warn",
      cats: ["psu"],
      text: `${psu.wattage}W will run, but ${recommended}W+ leaves headroom to upgrade later.`
    });
  }
  return issues;
}
function optionPreviewLevel(catId, option, sel) {
  const probe = { ...sel, [catId]: option };
  const issues = buildIssues(probe).filter((i) => i.cats.includes(catId));
  if (issues.some((i) => i.level === "error")) return "error";
  if (issues.some((i) => i.level === "warn")) return "warn";
  return "ok";
}
var hasStorage = () => typeof window !== "undefined" && window.storage;
function genCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}
function idsFromSelections(sel) {
  const out = {};
  Object.keys(sel).forEach((k) => {
    if (sel[k]) out[k] = sel[k].id;
  });
  return out;
}
function selectionsFromIds(ids) {
  const out = {};
  Object.keys(ids || {}).forEach((catId) => {
    const list = DATA[catId];
    if (!list) return;
    const found = list.find((o) => o.id === ids[catId]);
    if (found) out[catId] = found;
  });
  return out;
}
function TierPill({ tier, active, onClick }) {
  return /* @__PURE__ */ React.createElement("button", { className: `pill ${active ? "pill-active" : ""}`, onClick, type: "button" }, tier);
}
function StatusDot({ level }) {
  const cls = level === "error" ? "dot-error" : level === "warn" ? "dot-warn" : level === "ok" ? "dot-ok" : "dot-empty";
  return /* @__PURE__ */ React.createElement("span", { className: `status-dot ${cls}`, "aria-hidden": "true" });
}
function OptionCard({ option, category, selected, level, onSelect }) {
  const specs = useMemo(() => {
    switch (category.id) {
      case "cpu":
        return [`${option.socket}`, `${option.cores}C/${option.threads}T`, `${option.tdp}W TDP`];
      case "cooler":
        return [option.type, option.type === "Air" ? `${option.height}mm tall` : `${option.radiator}mm radiator`];
      case "motherboard":
        return [option.socket, option.chipset, option.formFactor, option.ramType, option.wifi ? "Wi-Fi" : "No Wi-Fi"];
      case "gpu":
        return [`${option.vram}GB VRAM`, `${option.length}mm`, `${option.tdp}W TDP`];
      case "ram":
        return [option.type, `${option.capacity}GB`, `${option.speed}MT/s`, `CL${option.cl}`];
      case "storage":
        return [option.type, `${option.capacity >= 1024 ? option.capacity / 1024 + "TB" : option.capacity + "GB"}`];
      case "psu":
        return [`${option.wattage}W`, option.efficiency, option.modular ? "Fully modular" : "Non-modular"];
      case "cabinet":
        return [option.formFactors.join(" / "), `GPU \u2264 ${option.maxGpuLength}mm`, `Cooler \u2264 ${option.maxCoolerHeight}mm`];
      case "fans":
        return [`${option.size}mm \xD7 ${option.count}`, option.argb ? "ARGB" : "No RGB"];
      case "monitor":
        return [`${option.size}\u2033`, option.resolution, `${option.refresh}Hz`];
      default:
        return [];
    }
  }, [option, category.id]);
  return /* @__PURE__ */ React.createElement("button", { type: "button", className: `opt-card ${selected ? "opt-card-selected" : ""}`, onClick: () => onSelect(option) }, /* @__PURE__ */ React.createElement("div", { className: "opt-top" }, /* @__PURE__ */ React.createElement("span", { className: "opt-brand" }, option.brand), /* @__PURE__ */ React.createElement(StatusDot, { level: selected ? "ok" : level })), /* @__PURE__ */ React.createElement("div", { className: "opt-name" }, option.name), /* @__PURE__ */ React.createElement("div", { className: "opt-specs" }, specs.map((s, i) => /* @__PURE__ */ React.createElement("span", { className: "spec-chip", key: i }, s))), /* @__PURE__ */ React.createElement("div", { className: "opt-bottom" }, /* @__PURE__ */ React.createElement("span", { className: "opt-tier" }, option.tier), /* @__PURE__ */ React.createElement("span", { className: "opt-price mono" }, INR(option.price))), selected && /* @__PURE__ */ React.createElement("div", { className: "opt-selected-badge" }, /* @__PURE__ */ React.createElement(Check, { size: 13, strokeWidth: 3 }), " Selected"));
}
function TicketRow({ cat, option, active, onClick, issueLevel }) {
  const Icon = cat.icon;
  return /* @__PURE__ */ React.createElement("button", { type: "button", className: "ticket-row", onClick }, /* @__PURE__ */ React.createElement("span", { className: `ticket-node ${option ? issueLevel === "error" ? "node-error" : "node-ok" : "node-empty"}` }, /* @__PURE__ */ React.createElement(Icon, { size: 14 })), /* @__PURE__ */ React.createElement("span", { className: "ticket-text" }, /* @__PURE__ */ React.createElement("span", { className: "ticket-cat" }, cat.short, !cat.required && /* @__PURE__ */ React.createElement("em", { className: "opt-suffix" }, " \\u00b7 optional")), /* @__PURE__ */ React.createElement("span", { className: "ticket-name" }, option ? option.name : "Not selected")), /* @__PURE__ */ React.createElement("span", { className: "ticket-price mono" }, option ? INR(option.price) : "\u2014"));
}
var CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));
var ANCHOR_FRACTIONS = {
  cabinet: { x: 0.5, y: 0.5, z: 0.5 },
  motherboard: { x: 0.16, y: 0.56, z: 0.5 },
  cpu: { x: 0.34, y: 0.74, z: 0.58 },
  cooler: { x: 0.34, y: 0.86, z: 0.58 },
  ram: { x: 0.5, y: 0.72, z: 0.58 },
  gpu: { x: 0.4, y: 0.46, z: 0.42 },
  storage: { x: 0.22, y: 0.32, z: 0.58 },
  psu: { x: 0.5, y: 0.09, z: 0.16 },
  fans: { x: 0.5, y: 0.56, z: 0.98 },
  paste: { x: 0.34, y: 0.8, z: 0.58 },
  monitor: { x: 1.38, y: 0.66, z: 0.5 },
  os: { x: 0.5, y: 1.1, z: 0.5 }
};
var STATUS_HEX = { ok: 5232841, warn: 15250233, error: 15881307, empty: 4936800 };
function partStatus(catId, selections, issues) {
  if (!selections[catId]) return "empty";
  const hit = issues.find((i) => i.cats.includes(catId));
  return hit ? hit.level : "ok";
}
function computeDims(cabinet) {
  const base = { w: 8, h: 9.4, d: 8.2 };
  if (!cabinet) return { ...base, w: base.w * 0.92, h: base.h * 0.92, d: base.d * 0.92, ghost: true };
  let scale = 0.7;
  if (cabinet.formFactors.includes("ATX")) scale = 1;
  else if (cabinet.formFactors.includes("mATX")) scale = 0.85;
  return { w: base.w * scale, h: base.h * scale, d: base.d * scale, ghost: false };
}
function toLocal(dims, fx, fy, fz) {
  return new THREE.Vector3((fx - 0.5) * dims.w, fy * dims.h, (fz - 0.5) * dims.d);
}
function stdMat(hex, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color: hex,
    metalness: opts.metalness ?? 0.4,
    roughness: opts.roughness ?? 0.55,
    emissive: opts.emissive ?? 0,
    emissiveIntensity: opts.emissiveIntensity ?? 0,
    transparent: !!opts.opacity,
    opacity: opts.opacity ?? 1,
    side: opts.side ?? THREE.FrontSide
  });
}
function buildCaseShell(dims, cabinet) {
  const group = new THREE.Group();
  const { w, h, d } = dims;
  const boxGeo = new THREE.BoxGeometry(w, h, d);
  const edges = new THREE.EdgesGeometry(boxGeo);
  const tier = cabinet?.tier;
  const tint = !cabinet ? 7042176 : tier === "Budget" ? 7041664 : tier === "Mainstream" ? 9082531 : tier === "High-End" ? 5232841 : 13206090;
  const wire = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: tint, transparent: true, opacity: cabinet ? 0.85 : 0.65 }));
  wire.position.y = h / 2;
  group.add(wire);
  const ghostFill = new THREE.Mesh(boxGeo, stdMat(0, { opacity: cabinet ? 0.12 : 0.22, side: THREE.BackSide }));
  ghostFill.position.y = h / 2;
  group.add(ghostFill);
  if (cabinet) {
    const glassOpacity = tier === "High-End" || tier === "Enthusiast" ? 0.1 : 0.3;
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(d, h), stdMat(tint, { opacity: glassOpacity, metalness: 0.1, roughness: 0.2, side: THREE.DoubleSide }));
    glass.rotation.y = Math.PI / 2;
    glass.position.set(w / 2 + 0.02, h / 2, 0);
    group.add(glass);
  }
  return group;
}
function buildMotherboard(pos, mobo) {
  const group = new THREE.Group();
  const plate = new THREE.Mesh(new THREE.BoxGeometry(0.1, 4.6, 4.4), stdMat(2047278, { roughness: 0.7, metalness: 0.1 }));
  plate.position.copy(pos);
  group.add(plate);
  const trim = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.18, 4.4), stdMat(13206090, { metalness: 0.6, roughness: 0.4 }));
  trim.position.set(pos.x, pos.y + 2.1, pos.z);
  group.add(trim);
  return group;
}
function buildCpu(pos, status) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.85, 0.85), stdMat(2764599, { metalness: 0.5 }));
  m.position.copy(pos);
  const cap = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.72, 0.72), stdMat(STATUS_HEX[status], { emissive: STATUS_HEX[status], emissiveIntensity: 0.35, metalness: 0.2 }));
  cap.position.set(pos.x + 0.1, pos.y, pos.z);
  const group = new THREE.Group();
  group.add(m, cap);
  return group;
}
function buildCooler(pos, cooler, dims, status) {
  const group = new THREE.Group();
  const accent = stdMat(STATUS_HEX[status], { emissive: STATUS_HEX[status], emissiveIntensity: 0.5 });
  if (cooler.type === "Air") {
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.16, 0.95), stdMat(3159615, { metalness: 0.6 }));
    base.position.set(pos.x - 0.1, pos.y, pos.z);
    group.add(base);
    const heightU = cooler.height / 100 * 0.95;
    for (let i = 0; i < 6; i++) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.04, heightU, 0.82), stdMat(4541527, { metalness: 0.7, roughness: 0.3 }));
      fin.position.set(pos.x - 0.1 + (i - 2.5) * 0.13, pos.y + heightU / 2 + 0.08, pos.z);
      group.add(fin);
    }
    const fan = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.07, 16), accent);
    fan.rotation.z = Math.PI / 2;
    fan.position.set(pos.x - 0.1, pos.y + heightU / 2, pos.z + 0.5);
    group.add(fan);
  } else {
    const pump = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.22, 0.5), stdMat(2764599, { metalness: 0.6 }));
    pump.position.copy(pos);
    group.add(pump);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.025, 8, 20), accent);
    ring.position.set(pos.x, pos.y + 0.12, pos.z);
    group.add(ring);
    const radLenU = cooler.radiator / 100 * 1;
    const radPos = new THREE.Vector3(0, dims.h * 0.94, 0);
    const radiator = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.16, radLenU), stdMat(3159615, { metalness: 0.7 }));
    radiator.position.copy(radPos);
    group.add(radiator);
    for (let i = -1; i <= 1; i += 2) {
      const fan = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.06, 16), stdMat(3817543, { metalness: 0.5 }));
      fan.position.set(radPos.x, radPos.y - 0.12, radPos.z + i * (radLenU * 0.28));
      group.add(fan);
    }
    [0.15, -0.15].forEach((off) => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(pos.x + off, pos.y + 0.15, pos.z),
        new THREE.Vector3(pos.x + off * 1.5, pos.y + dims.h * 0.5, pos.z + 0.3),
        new THREE.Vector3(off, radPos.y - 0.05, radPos.z - radLenU * 0.3)
      ]);
      const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 0.035, 6, false), stdMat(1316635, { roughness: 0.8 }));
      group.add(tube);
    });
  }
  return group;
}
function buildRam(pos, ram, status) {
  const group = new THREE.Group();
  const color = ram.tier === "Enthusiast" || ram.tier === "High-End" ? 3818064 : 2896186;
  [-0.16, 0.16].forEach((off) => {
    const stick = new THREE.Mesh(new THREE.BoxGeometry(0.07, 1, 0.46), stdMat(color, { metalness: 0.5 }));
    stick.position.set(pos.x + off, pos.y + 0.5, pos.z);
    group.add(stick);
    const led = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.06, 0.46), stdMat(STATUS_HEX[status], { emissive: STATUS_HEX[status], emissiveIntensity: 0.5 }));
    led.position.set(pos.x + off, pos.y + 1.02, pos.z);
    group.add(led);
  });
  return group;
}
function buildGpu(pos, gpu, status) {
  const group = new THREE.Group();
  const lenU = gpu.length / 100;
  const card = new THREE.Mesh(new THREE.BoxGeometry(0.45, 1.25, lenU), stdMat(2304048, { metalness: 0.5, roughness: 0.4 }));
  card.position.set(pos.x, pos.y, pos.z - lenU / 2 + 0.35);
  group.add(card);
  const strip = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.05, lenU), stdMat(STATUS_HEX[status], { emissive: STATUS_HEX[status], emissiveIntensity: 0.6 }));
  strip.position.set(pos.x, pos.y + 0.65, card.position.z);
  group.add(strip);
  for (const fz of [card.position.z - lenU * 0.22, card.position.z + lenU * 0.22]) {
    const fan = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.06, 14), stdMat(1711394, { metalness: 0.3 }));
    fan.rotation.x = Math.PI / 2;
    fan.position.set(pos.x + 0.26, pos.y, fz);
    group.add(fan);
  }
  return group;
}
function buildStorage(pos, storageItem, status) {
  const group = new THREE.Group();
  const isHdd = storageItem.type === "SATA HDD";
  if (isHdd) {
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.5, 0.62), stdMat(2896186, { metalness: 0.6 }));
    box.position.copy(pos);
    group.add(box);
  } else {
    const stick = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.1, 0.55), stdMat(1908774, { metalness: 0.5 }));
    stick.position.copy(pos);
    group.add(stick);
  }
  const dot = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 8), stdMat(STATUS_HEX[status], { emissive: STATUS_HEX[status], emissiveIntensity: 0.7 }));
  dot.position.set(pos.x + 0.08, pos.y + 0.1, pos.z);
  group.add(dot);
  return group;
}
function buildPsu(pos, psu, status) {
  const group = new THREE.Group();
  const box = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.55, 1.1), stdMat(2106411, { metalness: 0.6 }));
  box.position.copy(pos);
  group.add(box);
  const fan = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.05, 16), stdMat(2896186, { metalness: 0.4 }));
  fan.rotation.x = Math.PI / 2;
  fan.position.set(pos.x, pos.y + 0.28, pos.z);
  group.add(fan);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.02, 8, 20), stdMat(STATUS_HEX[status], { emissive: STATUS_HEX[status], emissiveIntensity: 0.5 }));
  ring.rotation.x = Math.PI / 2;
  ring.position.copy(fan.position);
  group.add(ring);
  return group;
}
function buildFans(pos, fansItem, status, dims) {
  const group = new THREE.Group();
  const count = Math.min(fansItem.count, 3);
  const color = fansItem.argb ? STATUS_HEX[status] : 3817543;
  for (let i = 0; i < count; i++) {
    const yOff = (i - (count - 1) / 2) * 1;
    const fan = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.05, 16), stdMat(2501168, { metalness: 0.4 }));
    fan.rotation.x = Math.PI / 2;
    fan.position.set(pos.x, pos.y + yOff, pos.z - 0.03);
    group.add(fan);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.018, 8, 20), stdMat(color, { emissive: fansItem.argb ? color : 0, emissiveIntensity: fansItem.argb ? 0.6 : 0 }));
    ring.rotation.x = Math.PI / 2;
    ring.position.copy(fan.position);
    group.add(ring);
  }
  return group;
}
function buildMonitor(pos, monitorItem) {
  const group = new THREE.Group();
  const w = Math.max(1.4, monitorItem.size * 0.045);
  const hgt = w * 0.56;
  const standPole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1, 8), stdMat(2896186, { metalness: 0.6 }));
  standPole.position.set(pos.x, pos.y - hgt / 2 - 0.5, pos.z);
  group.add(standPole);
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.42, 0.06, 16), stdMat(2106411, { metalness: 0.5 }));
  base.position.set(pos.x, pos.y - hgt / 2 - 1, pos.z);
  group.add(base);
  const panel = new THREE.Mesh(new THREE.BoxGeometry(w, hgt, 0.06), stdMat(1316635, { metalness: 0.3 }));
  panel.position.copy(pos);
  group.add(panel);
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.92, hgt * 0.88), stdMat(5232841, { emissive: 5232841, emissiveIntensity: 0.4, roughness: 0.2 }));
  screen.position.set(pos.x, pos.y, pos.z + 0.035);
  group.add(screen);
  return group;
}
function buildOsGlyph(pos) {
  const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(0.26, 0), stdMat(5232841, { emissive: 5232841, emissiveIntensity: 0.6, metalness: 0.1, roughness: 0.3 }));
  mesh.position.copy(pos);
  return mesh;
}
function buildGhostPart(catId, pos) {
  const mat = stdMat(4015184, { opacity: 0.28, metalness: 0.1, roughness: 0.8 });
  const edgeMat = new THREE.LineBasicMaterial({ color: 5923697, transparent: true, opacity: 0.55 });
  let geo, offset = new THREE.Vector3(0, 0, 0);
  switch (catId) {
    case "cpu":
      geo = new THREE.BoxGeometry(0.18, 0.85, 0.85);
      break;
    case "cooler":
      geo = new THREE.BoxGeometry(0.9, 1.1, 0.9);
      break;
    case "motherboard":
      geo = new THREE.BoxGeometry(0.1, 4.6, 4.4);
      break;
    case "gpu":
      geo = new THREE.BoxGeometry(0.45, 1.25, 2.6);
      offset = new THREE.Vector3(0, 0, -0.95);
      break;
    case "ram":
      geo = new THREE.BoxGeometry(0.4, 1, 0.46);
      break;
    case "storage":
      geo = new THREE.BoxGeometry(0.05, 0.1, 0.55);
      break;
    case "psu":
      geo = new THREE.BoxGeometry(1.1, 0.55, 1.1);
      break;
    case "fans":
      geo = new THREE.CylinderGeometry(0.5, 0.5, 0.06, 16);
      break;
    case "monitor":
      geo = new THREE.BoxGeometry(1.5, 0.85, 0.06);
      break;
    case "os":
      geo = new THREE.IcosahedronGeometry(0.2, 0);
      break;
    default:
      return null;
  }
  const group = new THREE.Group();
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.copy(pos).add(offset);
  group.add(mesh);
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), edgeMat);
  edges.position.copy(mesh.position);
  group.add(edges);
  return group;
}
function buildRig(selections, dims, issues) {
  const group = new THREE.Group();
  group.add(buildCaseShell(dims, selections.cabinet));
  const labels = [];
  CATEGORIES.forEach((cat) => {
    const frac = ANCHOR_FRACTIONS[cat.id];
    if (!frac) return;
    const pos = toLocal(dims, frac.x, frac.y, frac.z);
    const status = partStatus(cat.id, selections, issues);
    const sel = selections[cat.id];
    switch (cat.id) {
      case "cpu":
        group.add(sel ? buildCpu(pos, status) : buildGhostPart(cat.id, pos));
        break;
      case "cooler":
        group.add(sel ? buildCooler(pos, sel, dims, status) : buildGhostPart(cat.id, pos));
        break;
      case "motherboard":
        group.add(sel ? buildMotherboard(pos, sel) : buildGhostPart(cat.id, pos));
        break;
      case "gpu":
        group.add(sel ? buildGpu(pos, sel, status) : buildGhostPart(cat.id, pos));
        break;
      case "ram":
        group.add(sel ? buildRam(pos, sel, status) : buildGhostPart(cat.id, pos));
        break;
      case "storage":
        group.add(sel ? buildStorage(pos, sel, status) : buildGhostPart(cat.id, pos));
        break;
      case "psu":
        group.add(sel ? buildPsu(pos, sel, status) : buildGhostPart(cat.id, pos));
        break;
      case "fans":
        group.add(sel ? buildFans(pos, sel, status, dims) : buildGhostPart(cat.id, pos));
        break;
      case "monitor":
        group.add(sel ? buildMonitor(pos, sel) : buildGhostPart(cat.id, pos));
        break;
      case "os": {
        if (sel && sel.id !== "os-none") {
          const glyph = buildOsGlyph(pos);
          group.add(glyph);
          group.userData.osGlyph = glyph;
        } else {
          const ghost = buildGhostPart(cat.id, pos);
          if (ghost) group.add(ghost);
        }
        break;
      }
      default:
        break;
    }
    if (cat.id === "paste") return;
    labels.push({ id: cat.id, pos, status, title: sel ? sel.name : `Choose ${cat.label.toLowerCase()}` });
  });
  return { group, labels };
}
function disposeGroup(group) {
  group.traverse((obj) => {
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) {
      if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
      else obj.material.dispose();
    }
  });
}
function BuildStage({ selections, activeCat, issues, onSelectCat }) {
  const mountRef = useRef(null);
  const threeRef = useRef(null);
  const [labels, setLabels] = useState([]);
  const [hint, setHint] = useState(true);
  const selectionsRef = useRef(selections);
  selectionsRef.current = selections;
  const issuesRef = useRef(issues);
  issuesRef.current = issues;
  const activeCatRef = useRef(activeCat);
  activeCatRef.current = activeCat;
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, mount.clientWidth / mount.clientHeight, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);
    scene.add(new THREE.AmbientLight(16777215, 0.78));
    const key = new THREE.DirectionalLight(16777215, 1.05);
    key.position.set(6, 10, 8);
    scene.add(key);
    const fill = new THREE.DirectionalLight(16777215, 0.4);
    fill.position.set(-5, 6, 4);
    scene.add(fill);
    const rim = new THREE.PointLight(5232841, 0.85, 30);
    rim.position.set(-6, 4, -6);
    scene.add(rim);
    const warm = new THREE.PointLight(13206090, 0.7, 30);
    warm.position.set(5, 2, 6);
    scene.add(warm);
    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(6.5, 40),
      new THREE.MeshBasicMaterial({ color: 1448738, transparent: true, opacity: 0.55, side: THREE.DoubleSide })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.02;
    scene.add(ground);
    const groundRing = new THREE.Mesh(
      new THREE.RingGeometry(6.3, 6.5, 48),
      new THREE.MeshBasicMaterial({ color: 13206090, transparent: true, opacity: 0.35, side: THREE.DoubleSide })
    );
    groundRing.rotation.x = -Math.PI / 2;
    groundRing.position.y = -0.01;
    scene.add(groundRing);
    const rig = new THREE.Group();
    scene.add(rig);
    const state = {
      scene,
      camera,
      renderer,
      rig,
      theta: 0.9,
      phi: 1.05,
      radius: 11,
      dragging: false,
      lastX: 0,
      lastY: 0,
      lastInteraction: Date.now(),
      focusCurrent: new THREE.Vector3(0, 4.3, 0),
      raf: 0,
      frame: 0
    };
    threeRef.current = state;
    function onPointerDown(e) {
      state.dragging = true;
      state.lastX = e.clientX;
      state.lastY = e.clientY;
      state.lastInteraction = Date.now();
      setHint(false);
    }
    function onPointerMove(e) {
      if (!state.dragging) return;
      const dx = e.clientX - state.lastX;
      const dy = e.clientY - state.lastY;
      state.lastX = e.clientX;
      state.lastY = e.clientY;
      state.theta -= dx * 6e-3;
      state.phi = Math.min(1.5, Math.max(0.25, state.phi - dy * 6e-3));
      state.lastInteraction = Date.now();
    }
    function onPointerUp() {
      state.dragging = false;
    }
    function onWheel(e) {
      e.preventDefault();
      state.radius = Math.min(16, Math.max(6, state.radius + e.deltaY * 0.01));
      state.lastInteraction = Date.now();
    }
    mount.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    mount.addEventListener("wheel", onWheel, { passive: false });
    const ro = new ResizeObserver(() => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    });
    ro.observe(mount);
    function loop() {
      state.frame++;
      const idle = Date.now() - state.lastInteraction > 1800;
      if (idle && !state.dragging) state.theta += 22e-4;
      const focusFrac = ANCHOR_FRACTIONS[activeCatRef.current] || ANCHOR_FRACTIONS.cabinet;
      const dims = computeDims(selectionsRef.current.cabinet);
      const desiredFocus = toLocal(dims, Math.min(focusFrac.x, 0.7), focusFrac.y, focusFrac.z);
      state.focusCurrent.lerp(desiredFocus, 0.06);
      const x = state.focusCurrent.x + state.radius * Math.sin(state.phi) * Math.sin(state.theta);
      const y = state.focusCurrent.y + state.radius * Math.cos(state.phi);
      const z = state.focusCurrent.z + state.radius * Math.sin(state.phi) * Math.cos(state.theta);
      camera.position.set(x, y, z);
      camera.lookAt(state.focusCurrent);
      if (rig.userData.osGlyph) {
        const pulse = 0.5 + Math.sin(state.frame * 0.05) * 0.25;
        rig.userData.osGlyph.material.emissiveIntensity = pulse;
        rig.userData.osGlyph.rotation.y += 0.01;
      }
      if (state.frame % 3 === 0 && mount) {
        const w = mount.clientWidth, h = mount.clientHeight;
        const next = (state.currentLabels || []).map((l) => {
          const v = l.pos.clone().project(camera);
          return {
            id: l.id,
            status: l.status,
            title: l.title,
            x: (v.x * 0.5 + 0.5) * w,
            y: (-v.y * 0.5 + 0.5) * h,
            visible: v.z < 1
          };
        });
        setLabels(next);
      }
      renderer.render(scene, camera);
      state.raf = requestAnimationFrame(loop);
    }
    loop();
    return () => {
      cancelAnimationFrame(state.raf);
      ro.disconnect();
      mount.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      mount.removeEventListener("wheel", onWheel);
      disposeGroup(rig);
      renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, []);
  useEffect(() => {
    const state = threeRef.current;
    if (!state) return;
    const dims = computeDims(selections.cabinet);
    const { group: newRig, labels: newLabels } = buildRig(selections, dims, issues);
    disposeGroup(state.rig);
    while (state.rig.children.length) state.rig.remove(state.rig.children[0]);
    while (newRig.children.length) state.rig.add(newRig.children[0]);
    state.rig.userData.osGlyph = newRig.userData.osGlyph;
    state.currentLabels = newLabels;
  }, [selections, issues]);
  function resetView() {
    const state = threeRef.current;
    if (!state) return;
    state.theta = 0.9;
    state.phi = 1.05;
    state.radius = 11;
    state.lastInteraction = Date.now() - 5e3;
  }
  const [hoveredId, setHoveredId] = useState(null);
  const activeMeta = CATEGORY_MAP[activeCat];
  const ActiveIcon = activeMeta?.icon;
  const activeSel = selections[activeCat];
  return /* @__PURE__ */ React.createElement("div", { className: "stage-wrap" }, /* @__PURE__ */ React.createElement("div", { className: "stage-mount", ref: mountRef }), /* @__PURE__ */ React.createElement("div", { className: "stage-caption" }, ActiveIcon && /* @__PURE__ */ React.createElement(ActiveIcon, { size: 15 }), /* @__PURE__ */ React.createElement("span", { className: "stage-caption-cat" }, activeMeta?.label), /* @__PURE__ */ React.createElement("span", { className: "stage-caption-sep" }, "\\u00b7"), /* @__PURE__ */ React.createElement("span", { className: `stage-caption-name ${activeSel ? "" : "stage-caption-empty"}` }, activeSel ? activeSel.name : "Not selected yet")), /* @__PURE__ */ React.createElement("div", { className: "stage-labels" }, labels.filter((l) => l.visible).map((l) => {
    const expanded = activeCat === l.id || hoveredId === l.id;
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: l.id,
        type: "button",
        className: `stage-label ${expanded ? "stage-label-expanded" : ""} ${activeCat === l.id ? "stage-label-active" : ""}`,
        style: { left: l.x, top: l.y },
        onClick: () => onSelectCat(l.id),
        onMouseEnter: () => setHoveredId(l.id),
        onMouseLeave: () => setHoveredId((h) => h === l.id ? null : h),
        title: l.title
      },
      /* @__PURE__ */ React.createElement(StatusDot, { level: l.status }),
      expanded && /* @__PURE__ */ React.createElement("span", null, CATEGORY_MAP[l.id]?.short)
    );
  })), hint && /* @__PURE__ */ React.createElement("div", { className: "stage-hint" }, "Drag to rotate \\u00b7 scroll to zoom"), /* @__PURE__ */ React.createElement("button", { type: "button", className: "stage-reset", onClick: resetView, title: "Reset view" }, /* @__PURE__ */ React.createElement(RotateCcw, { size: 13 })));
}
function App() {
  const [activeCat, setActiveCat] = useState("cpu");
  const [selections, setSelections] = useState({});
  const [buildName, setBuildName] = useState("My Build");
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("All");
  const [ticketOpenMobile, setTicketOpenMobile] = useState(false);
  const [savedBuilds, setSavedBuilds] = useState([]);
  const [savedLoading, setSavedLoading] = useState(true);
  const [savePanelOpen, setSavePanelOpen] = useState(false);
  const [sharePanelOpen, setSharePanelOpen] = useState(false);
  const [shareCode, setShareCode] = useState(null);
  const [loadCodeInput, setLoadCodeInput] = useState("");
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  function showToast(msg) {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }
  useEffect(() => {
    async function load() {
      if (!hasStorage()) {
        setSavedLoading(false);
        return;
      }
      try {
        const listRes = await window.storage.list("trace-build:", false);
        const keys = listRes?.keys || [];
        const builds = [];
        for (const k of keys) {
          try {
            const res = await window.storage.get(k, false);
            if (res?.value) builds.push(JSON.parse(res.value));
          } catch (e) {
          }
        }
        builds.sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0));
        setSavedBuilds(builds);
      } catch (e) {
      } finally {
        setSavedLoading(false);
      }
    }
    load();
  }, []);
  const issues = useMemo(() => buildIssues(selections), [selections]);
  const totalPrice = useMemo(
    () => Object.values(selections).reduce((sum, o) => sum + (o ? o.price : 0), 0),
    [selections]
  );
  const filledRequired = REQUIRED_IDS.filter((id) => selections[id]).length;
  const estimatedWattage = (selections.cpu?.tdp || 0) + (selections.gpu?.tdp || 0) + 120;
  const psuWattage = selections.psu?.wattage || 0;
  const wattagePct = psuWattage ? Math.min(100, Math.round(estimatedWattage / psuWattage * 100)) : 0;
  function selectOption(catId, option) {
    setSelections((prev) => ({ ...prev, [catId]: prev[catId]?.id === option.id ? void 0 : option }));
  }
  function resetBuild() {
    setSelections({});
    setBuildName("My Build");
    showToast("Build cleared.");
  }
  const activeCategory = CATEGORIES.find((c) => c.id === activeCat);
  const activeOptions = DATA[activeCat] || [];
  const tiers = useMemo(() => ["All", ...Array.from(new Set(activeOptions.map((o) => o.tier)))], [activeOptions]);
  const visibleOptions = activeOptions.filter((o) => {
    const matchesSearch = `${o.brand} ${o.name}`.toLowerCase().includes(search.toLowerCase());
    const matchesTier = tierFilter === "All" || o.tier === tierFilter;
    return matchesSearch && matchesTier;
  });
  useEffect(() => {
    setSearch("");
    setTierFilter("All");
  }, [activeCat]);
  async function handleSave(name) {
    if (!hasStorage()) {
      showToast("Saving isn't available in this preview.");
      return;
    }
    try {
      const id = `b_${Date.now()}`;
      const record = { id, name: name || "Untitled build", ids: idsFromSelections(selections), total: totalPrice, savedAt: Date.now() };
      const res = await window.storage.set(`trace-build:${id}`, JSON.stringify(record), false);
      if (!res) throw new Error("write failed");
      setSavedBuilds((prev) => [record, ...prev]);
      showToast(`Saved \u201C${record.name}\u201D.`);
      setSavePanelOpen(false);
    } catch (e) {
      showToast("Couldn't save the build \u2014 try again.");
    }
  }
  async function handleDeleteSaved(id) {
    if (!hasStorage()) return;
    try {
      await window.storage.delete(`trace-build:${id}`, false);
      setSavedBuilds((prev) => prev.filter((b) => b.id !== id));
      showToast("Removed.");
    } catch (e) {
      showToast("Couldn't remove that build.");
    }
  }
  function handleLoadSaved(build) {
    setSelections(selectionsFromIds(build.ids));
    setBuildName(build.name);
    showToast(`Loaded \u201C${build.name}\u201D.`);
  }
  async function handleShare() {
    if (!hasStorage()) {
      showToast("Sharing isn't available in this preview.");
      return;
    }
    try {
      const code = genCode();
      const res = await window.storage.set(`trace-share:${code}`, JSON.stringify({ name: buildName, ids: idsFromSelections(selections) }), true);
      if (!res) throw new Error("write failed");
      setShareCode(code);
    } catch (e) {
      showToast("Couldn't generate a share code.");
    }
  }
  async function handleLoadCode() {
    const code = loadCodeInput.trim().toUpperCase();
    if (!code) return;
    if (!hasStorage()) {
      showToast("Loading shared builds isn't available in this preview.");
      return;
    }
    try {
      const res = await window.storage.get(`trace-share:${code}`, true);
      if (!res?.value) throw new Error("not found");
      const parsed = JSON.parse(res.value);
      setSelections(selectionsFromIds(parsed.ids));
      setBuildName(parsed.name || "Shared build");
      showToast("Build loaded from code.");
      setLoadCodeInput("");
      setSharePanelOpen(false);
    } catch (e) {
      showToast("That code didn't match a saved build.");
    }
  }
  function copyCode() {
    if (!shareCode) return;
    try {
      navigator.clipboard.writeText(shareCode);
      showToast("Code copied.");
    } catch (e) {
      showToast(`Code: ${shareCode}`);
    }
  }
  return /* @__PURE__ */ React.createElement("div", { className: "trace-root" }, /* @__PURE__ */ React.createElement("style", null, CSS), /* @__PURE__ */ React.createElement("header", { className: "header" }, /* @__PURE__ */ React.createElement("div", { className: "brand" }, /* @__PURE__ */ React.createElement("span", { className: "brand-mark" }, /* @__PURE__ */ React.createElement(CircuitBoard, { size: 18, strokeWidth: 2.2 })), /* @__PURE__ */ React.createElement("span", { className: "brand-name" }, "TRACE"), /* @__PURE__ */ React.createElement("span", { className: "brand-tag" }, "build the circuit")), /* @__PURE__ */ React.createElement(
    "input",
    {
      className: "build-name-input",
      value: buildName,
      onChange: (e) => setBuildName(e.target.value),
      "aria-label": "Build name"
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "header-actions" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost", onClick: resetBuild, type: "button" }, /* @__PURE__ */ React.createElement(RotateCcw, { size: 14 }), " New"), /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost", onClick: () => setSavePanelOpen((v) => !v), type: "button" }, /* @__PURE__ */ React.createElement(FolderOpen, { size: 14 }), " My builds"), /* @__PURE__ */ React.createElement("button", { className: "btn btn-outline", onClick: () => setSavePanelOpen("save"), type: "button" }, /* @__PURE__ */ React.createElement(Save, { size: 14 }), " Save"), /* @__PURE__ */ React.createElement("button", { className: "btn btn-copper", onClick: () => {
    setSharePanelOpen(true);
    setShareCode(null);
  }, type: "button" }, /* @__PURE__ */ React.createElement(Share2, { size: 14 }), " Share"))), /* @__PURE__ */ React.createElement("div", { className: "layout" }, /* @__PURE__ */ React.createElement("nav", { className: "rail", "aria-label": "Component categories" }, /* @__PURE__ */ React.createElement("div", { className: "rail-progress" }, /* @__PURE__ */ React.createElement("span", { className: "mono" }, filledRequired, "/", REQUIRED_IDS.length), " core parts", /* @__PURE__ */ React.createElement("div", { className: "rail-progress-bar" }, /* @__PURE__ */ React.createElement("div", { className: "rail-progress-fill", style: { width: `${filledRequired / REQUIRED_IDS.length * 100}%` } }))), CATEGORIES.map((cat) => {
    const Icon = cat.icon;
    const sel = selections[cat.id];
    const catIssue = issues.find((i) => i.cats[0] === cat.id);
    const level = sel ? catIssue ? catIssue.level : "ok" : "empty";
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: cat.id,
        type: "button",
        className: `rail-item ${activeCat === cat.id ? "rail-item-active" : ""}`,
        onClick: () => setActiveCat(cat.id)
      },
      /* @__PURE__ */ React.createElement(Icon, { size: 16, className: "rail-icon" }),
      /* @__PURE__ */ React.createElement("span", { className: "rail-label" }, /* @__PURE__ */ React.createElement("span", { className: "rail-cat-name" }, cat.label, !cat.required && /* @__PURE__ */ React.createElement("em", { className: "opt-suffix" }, " \\u00b7 optional")), /* @__PURE__ */ React.createElement("span", { className: "rail-cat-sel" }, sel ? sel.name : "\u2014")),
      /* @__PURE__ */ React.createElement(StatusDot, { level })
    );
  })), /* @__PURE__ */ React.createElement("main", { className: "main" }, /* @__PURE__ */ React.createElement("div", { className: "main-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "main-title" }, activeCategory.label), /* @__PURE__ */ React.createElement("p", { className: "main-sub" }, activeCategory.required ? "Required for a working build." : "Optional \u2014 add it if you need one.")), /* @__PURE__ */ React.createElement("div", { className: "main-filters" }, /* @__PURE__ */ React.createElement("div", { className: "search-box" }, /* @__PURE__ */ React.createElement(Search, { size: 14 }), /* @__PURE__ */ React.createElement(
    "input",
    {
      placeholder: `Search ${activeCategory.short.toLowerCase()}\u2026`,
      value: search,
      onChange: (e) => setSearch(e.target.value)
    }
  )))), /* @__PURE__ */ React.createElement(BuildStage, { selections, activeCat, issues, onSelectCat: setActiveCat }), /* @__PURE__ */ React.createElement("div", { className: "tier-row" }, tiers.map((t) => /* @__PURE__ */ React.createElement(TierPill, { key: t, tier: t, active: tierFilter === t, onClick: () => setTierFilter(t) }))), /* @__PURE__ */ React.createElement("div", { className: "opt-grid" }, visibleOptions.length === 0 && /* @__PURE__ */ React.createElement("div", { className: "empty-state" }, "No matches \\u2014 try a different search or tier."), visibleOptions.map((opt) => {
    const isSelected = selections[activeCat]?.id === opt.id;
    const level = optionPreviewLevel(activeCat, opt, selections);
    return /* @__PURE__ */ React.createElement(
      OptionCard,
      {
        key: opt.id,
        option: opt,
        category: activeCategory,
        selected: isSelected,
        level,
        onSelect: (o) => selectOption(activeCat, o)
      }
    );
  }))), /* @__PURE__ */ React.createElement("aside", { className: `ticket ${ticketOpenMobile ? "ticket-open" : ""}` }, /* @__PURE__ */ React.createElement("div", { className: "ticket-header" }, /* @__PURE__ */ React.createElement("span", null, "Build ticket"), /* @__PURE__ */ React.createElement("span", { className: "mono ticket-total" }, INR(totalPrice))), /* @__PURE__ */ React.createElement("div", { className: "ticket-trace" }, /* @__PURE__ */ React.createElement("svg", { className: "trace-line", viewBox: `0 0 24 ${CATEGORIES.length * 56}`, preserveAspectRatio: "none", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("line", { x1: "12", y1: "0", x2: "12", y2: CATEGORIES.length * 56, className: "trace-line-bg" }), /* @__PURE__ */ React.createElement(
    "line",
    {
      x1: "12",
      y1: "0",
      x2: "12",
      y2: filledRequired === REQUIRED_IDS.length ? CATEGORIES.length * 56 : filledRequired / REQUIRED_IDS.length * (REQUIRED_IDS.length * 56),
      className: `trace-line-fg ${issues.some((i) => i.level === "error") ? "trace-line-error" : ""}`
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "ticket-rows" }, CATEGORIES.map((cat) => /* @__PURE__ */ React.createElement(
    TicketRow,
    {
      key: cat.id,
      cat,
      option: selections[cat.id],
      active: activeCat === cat.id,
      onClick: () => setActiveCat(cat.id),
      issueLevel: issues.find((i) => i.cats.includes(cat.id))?.level
    }
  )))), /* @__PURE__ */ React.createElement("div", { className: "wattage-block" }, /* @__PURE__ */ React.createElement("div", { className: "wattage-label" }, /* @__PURE__ */ React.createElement(Gauge, { size: 14 }), " Estimated load ", /* @__PURE__ */ React.createElement("span", { className: "mono" }, estimatedWattage, "W"), psuWattage > 0 && /* @__PURE__ */ React.createElement("span", { className: "mono" }, " / ", psuWattage, "W")), /* @__PURE__ */ React.createElement("div", { className: "wattage-bar" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: `wattage-fill ${wattagePct > 85 ? "wattage-hot" : ""}`,
      style: { width: `${psuWattage ? wattagePct : 0}%` }
    }
  ))), /* @__PURE__ */ React.createElement("div", { className: "issues-block" }, issues.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "issue-ok" }, /* @__PURE__ */ React.createElement(Check, { size: 14 }), " No conflicts so far.") : issues.map((iss, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: `issue-row issue-${iss.level}` }, /* @__PURE__ */ React.createElement(AlertTriangle, { size: 14 }), /* @__PURE__ */ React.createElement("span", null, iss.text)))), /* @__PURE__ */ React.createElement("div", { className: "ticket-footer-actions" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-outline btn-block", onClick: () => setSavePanelOpen("save"), type: "button" }, /* @__PURE__ */ React.createElement(Save, { size: 14 }), " Save build"), /* @__PURE__ */ React.createElement("button", { className: "btn btn-copper btn-block", onClick: () => {
    setSharePanelOpen(true);
    setShareCode(null);
  }, type: "button" }, /* @__PURE__ */ React.createElement(Share2, { size: 14 }), " Share build")))), /* @__PURE__ */ React.createElement("button", { type: "button", className: "mobile-bar", onClick: () => setTicketOpenMobile((v) => !v) }, /* @__PURE__ */ React.createElement("span", null, filledRequired, "/", REQUIRED_IDS.length, " parts"), /* @__PURE__ */ React.createElement("span", { className: "mono" }, INR(totalPrice)), /* @__PURE__ */ React.createElement(ChevronDown, { size: 16, className: ticketOpenMobile ? "chev-up" : "" })), savePanelOpen && /* @__PURE__ */ React.createElement("div", { className: "modal-backdrop", onClick: () => setSavePanelOpen(false) }, /* @__PURE__ */ React.createElement("div", { className: "modal", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("div", { className: "modal-head" }, /* @__PURE__ */ React.createElement("h2", null, savePanelOpen === "save" ? "Save this build" : "My saved builds"), /* @__PURE__ */ React.createElement("button", { className: "icon-btn", onClick: () => setSavePanelOpen(false), type: "button" }, /* @__PURE__ */ React.createElement(X, { size: 16 }))), savePanelOpen === "save" && /* @__PURE__ */ React.createElement("div", { className: "modal-body" }, /* @__PURE__ */ React.createElement("label", { className: "field-label", htmlFor: "save-name" }, "Name"), /* @__PURE__ */ React.createElement("input", { id: "save-name", className: "field-input", value: buildName, onChange: (e) => setBuildName(e.target.value) }), /* @__PURE__ */ React.createElement("button", { className: "btn btn-copper btn-block", onClick: () => handleSave(buildName), type: "button" }, /* @__PURE__ */ React.createElement(Save, { size: 14 }), " Save build")), savePanelOpen === true && /* @__PURE__ */ React.createElement("div", { className: "modal-body" }, savedLoading && /* @__PURE__ */ React.createElement("p", { className: "muted" }, "Loading\\u2026"), !savedLoading && savedBuilds.length === 0 && /* @__PURE__ */ React.createElement("p", { className: "muted" }, "No saved builds yet. Save your current build to see it here."), /* @__PURE__ */ React.createElement("div", { className: "saved-list" }, savedBuilds.map((b) => /* @__PURE__ */ React.createElement("div", { className: "saved-item", key: b.id }, /* @__PURE__ */ React.createElement("div", { className: "saved-item-text" }, /* @__PURE__ */ React.createElement("span", { className: "saved-item-name" }, b.name), /* @__PURE__ */ React.createElement("span", { className: "saved-item-meta mono" }, INR(b.total), " \\u00b7 ", Object.keys(b.ids || {}).length, " parts")), /* @__PURE__ */ React.createElement("div", { className: "saved-item-actions" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-outline btn-sm", onClick: () => {
    handleLoadSaved(b);
    setSavePanelOpen(false);
  }, type: "button" }, "Load"), /* @__PURE__ */ React.createElement("button", { className: "icon-btn", onClick: () => handleDeleteSaved(b.id), type: "button", "aria-label": "Delete build" }, /* @__PURE__ */ React.createElement(Trash2, { size: 14 }))))))))), sharePanelOpen && /* @__PURE__ */ React.createElement("div", { className: "modal-backdrop", onClick: () => setSharePanelOpen(false) }, /* @__PURE__ */ React.createElement("div", { className: "modal", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("div", { className: "modal-head" }, /* @__PURE__ */ React.createElement("h2", null, "Share this build"), /* @__PURE__ */ React.createElement("button", { className: "icon-btn", onClick: () => setSharePanelOpen(false), type: "button" }, /* @__PURE__ */ React.createElement(X, { size: 16 }))), /* @__PURE__ */ React.createElement("div", { className: "modal-body" }, /* @__PURE__ */ React.createElement("p", { className: "muted" }, "Generate a code, send it to anyone. They paste it below to load your exact selections."), !shareCode ? /* @__PURE__ */ React.createElement("button", { className: "btn btn-copper btn-block", onClick: handleShare, type: "button" }, /* @__PURE__ */ React.createElement(Sparkles, { size: 14 }), " Generate share code") : /* @__PURE__ */ React.createElement("div", { className: "share-code-row" }, /* @__PURE__ */ React.createElement("span", { className: "share-code mono" }, shareCode), /* @__PURE__ */ React.createElement("button", { className: "btn btn-outline btn-sm", onClick: copyCode, type: "button" }, /* @__PURE__ */ React.createElement(Copy, { size: 13 }), " Copy")), /* @__PURE__ */ React.createElement("div", { className: "divider" }, /* @__PURE__ */ React.createElement("span", null, "or load a build")), /* @__PURE__ */ React.createElement("div", { className: "load-code-row" }, /* @__PURE__ */ React.createElement(
    "input",
    {
      className: "field-input",
      placeholder: "Enter 6-character code",
      value: loadCodeInput,
      onChange: (e) => setLoadCodeInput(e.target.value),
      maxLength: 6
    }
  ), /* @__PURE__ */ React.createElement("button", { className: "btn btn-outline", onClick: handleLoadCode, type: "button" }, "Load"))))), toast && /* @__PURE__ */ React.createElement("div", { className: "toast" }, toast));
}
var CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');

:root {
  --bg: #0F1115;
  --panel: #161A20;
  --panel-2: #1C212A;
  --line: #262C36;
  --copper: #C9824A;
  --copper-soft: #E3A872;
  --cyan: #4FD8C9;
  --red: #F2545B;
  --amber: #E8B339;
  --text: #ECEAE4;
  --text-dim: #9098A6;
  --radius: 10px;
}

.trace-root * { box-sizing: border-box; }
.trace-root {
  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', sans-serif;
  min-height: 100%;
  width: 100%;
  position: relative;
  background-image:
    linear-gradient(var(--line) 1px, transparent 1px),
    linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 28px 28px;
  background-position: -1px -1px;
}
.mono { font-family: 'JetBrains Mono', monospace; }
.muted { color: var(--text-dim); font-size: 13px; }

button { font-family: inherit; cursor: pointer; }
button:focus-visible, input:focus-visible { outline: 2px solid var(--cyan); outline-offset: 2px; }

/* ---- header ---- */
.header {
  display: flex; align-items: center; gap: 16px;
  padding: 14px 20px;
  border-bottom: 1px solid var(--line);
  background: rgba(15,17,21,0.92);
  backdrop-filter: blur(6px);
  position: sticky; top: 0; z-index: 20;
  flex-wrap: wrap;
}
.brand { display: flex; align-items: baseline; gap: 9px; }
.brand-mark { color: var(--copper); display: inline-flex; transform: translateY(2px); }
.brand-name { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 19px; letter-spacing: 0.04em; }
.brand-tag { color: var(--text-dim); font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; }
.build-name-input {
  flex: 1; min-width: 140px; max-width: 280px;
  background: var(--panel); border: 1px solid var(--line); color: var(--text);
  border-radius: 7px; padding: 7px 11px; font-size: 13px; font-weight: 500;
}
.header-actions { display: flex; gap: 8px; margin-left: auto; flex-wrap: wrap; }

.btn {
  display: inline-flex; align-items: center; gap: 6px;
  border-radius: 7px; padding: 8px 13px; font-size: 13px; font-weight: 500;
  border: 1px solid transparent; transition: transform .12s ease, background .15s ease;
  white-space: nowrap;
}
.btn:active { transform: scale(0.97); }
.btn-ghost { background: transparent; color: var(--text-dim); border-color: var(--line); }
.btn-ghost:hover { color: var(--text); border-color: #38404d; }
.btn-outline { background: var(--panel); color: var(--text); border-color: var(--line); }
.btn-outline:hover { border-color: var(--cyan); }
.btn-copper { background: var(--copper); color: #1A1206; border-color: var(--copper); }
.btn-copper:hover { background: var(--copper-soft); }
.btn-block { width: 100%; justify-content: center; }
.btn-sm { padding: 5px 9px; font-size: 12px; }

/* ---- layout ---- */
.layout { display: grid; grid-template-columns: 228px 1fr 360px; min-height: calc(100vh - 64px); }

/* ---- rail ---- */
.rail { border-right: 1px solid var(--line); padding: 16px 10px; display: flex; flex-direction: column; gap: 3px; background: rgba(22,26,32,0.4); }
.rail-progress { font-size: 11px; color: var(--text-dim); padding: 2px 10px 14px; }
.rail-progress-bar { margin-top: 6px; height: 4px; background: var(--line); border-radius: 4px; overflow: hidden; }
.rail-progress-fill { height: 100%; background: var(--copper); transition: width .3s ease; }
.rail-item {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 10px; border-radius: 8px; border: 1px solid transparent;
  background: transparent; text-align: left; width: 100%;
}
.rail-item:hover { background: var(--panel); }
.rail-item-active { background: var(--panel-2); border-color: var(--line); }
.rail-icon { color: var(--text-dim); flex-shrink: 0; }
.rail-item-active .rail-icon { color: var(--copper); }
.rail-label { display: flex; flex-direction: column; min-width: 0; flex: 1; }
.rail-cat-name { font-size: 12.5px; font-weight: 600; }
.rail-cat-sel { font-size: 11px; color: var(--text-dim); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 130px; }
.opt-suffix { color: var(--text-dim); font-style: italic; font-weight: 400; }

.status-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.dot-empty { background: #333a45; }
.dot-ok { background: var(--cyan); box-shadow: 0 0 6px rgba(79,216,201,0.6); }
.dot-warn { background: var(--amber); box-shadow: 0 0 6px rgba(232,179,57,0.5); }
.dot-error { background: var(--red); box-shadow: 0 0 6px rgba(242,84,91,0.6); }

/* ---- main ---- */
.main { padding: 24px 28px 80px; min-width: 0; }
.main-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; flex-wrap: wrap; margin-bottom: 14px; }
.main-title { font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 700; margin: 0; }
.main-sub { color: var(--text-dim); font-size: 13px; margin: 4px 0 0; }
.search-box { display: flex; align-items: center; gap: 7px; background: var(--panel); border: 1px solid var(--line); border-radius: 7px; padding: 7px 11px; color: var(--text-dim); }
.search-box input { background: transparent; border: none; color: var(--text); font-size: 13px; width: 180px; }
.search-box input:focus { outline: none; }

.tier-row { display: flex; gap: 6px; margin-bottom: 18px; flex-wrap: wrap; }
.pill { padding: 5px 12px; border-radius: 999px; border: 1px solid var(--line); background: transparent; color: var(--text-dim); font-size: 12px; font-weight: 500; }
.pill-active { background: var(--copper); border-color: var(--copper); color: #1A1206; }

.stage-wrap { position: relative; height: 400px; margin-bottom: 18px; border: 1px solid var(--line); border-radius: 14px; overflow: hidden; background: radial-gradient(circle at 50% 38%, #1d2531 0%, #12151b 65%, #0F1115 100%); }
.stage-mount { width: 100%; height: 100%; touch-action: none; cursor: grab; }
.stage-mount:active { cursor: grabbing; }

.stage-caption {
  position: absolute; top: 12px; left: 12px; z-index: 2;
  display: flex; align-items: center; gap: 7px;
  background: rgba(18,21,27,0.92); border: 1px solid var(--line); border-radius: 9px;
  padding: 8px 13px; font-size: 13px; backdrop-filter: blur(4px);
  max-width: calc(100% - 70px);
}
.stage-caption svg { color: var(--copper-soft); flex-shrink: 0; }
.stage-caption-cat { font-weight: 700; font-family: 'Space Grotesk', sans-serif; white-space: nowrap; }
.stage-caption-sep { color: var(--text-dim); }
.stage-caption-name { color: var(--cyan); font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.stage-caption-empty { color: var(--text-dim); font-weight: 500; font-style: italic; }

.stage-labels { position: absolute; inset: 0; pointer-events: none; }
.stage-label {
  position: absolute; transform: translate(-50%, -50%);
  display: flex; align-items: center; gap: 5px;
  background: rgba(22,26,32,0.85); border: 1px solid var(--line); border-radius: 999px;
  padding: 5px; font-size: 11px; font-weight: 600; color: var(--text-dim);
  pointer-events: auto; backdrop-filter: blur(3px);
  transition: border-color .15s ease, color .15s ease, padding .15s ease, background .15s ease;
}
.stage-label .status-dot { width: 9px; height: 9px; }
.stage-label-expanded { padding: 5px 10px 5px 7px; background: rgba(22,26,32,0.95); }
.stage-label:hover { color: var(--text); border-color: #46505d; }
.stage-label-active { border-color: var(--copper); color: var(--copper-soft); }
.stage-hint {
  position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%);
  font-size: 11px; color: var(--text-dim); background: rgba(22,26,32,0.8);
  padding: 5px 11px; border-radius: 999px; border: 1px solid var(--line); pointer-events: none;
}
.stage-reset {
  position: absolute; top: 10px; right: 10px; background: rgba(22,26,32,0.85);
  border: 1px solid var(--line); color: var(--text-dim); border-radius: 7px; padding: 6px;
  display: inline-flex; z-index: 2;
}
.stage-reset:hover { color: var(--text); border-color: #46505d; }
@media (max-width: 760px) { .stage-wrap { height: 300px; } .stage-caption { font-size: 12px; } }

.opt-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 12px; }
.empty-state { color: var(--text-dim); font-size: 13px; padding: 30px 0; grid-column: 1 / -1; text-align: center; }


.opt-card {
  position: relative; text-align: left; background: var(--panel);
  border: 1px solid var(--line); border-radius: var(--radius); padding: 14px;
  display: flex; flex-direction: column; gap: 8px; transition: border-color .15s ease, transform .12s ease;
}
.opt-card:hover { border-color: #3a424f; transform: translateY(-1px); }
.opt-card-selected { border-color: var(--cyan); background: linear-gradient(180deg, rgba(79,216,201,0.07), transparent); }
.opt-top { display: flex; justify-content: space-between; align-items: center; }
.opt-brand { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-dim); font-weight: 600; }
.opt-name { font-size: 14px; font-weight: 600; line-height: 1.3; }
.opt-specs { display: flex; flex-wrap: wrap; gap: 5px; }
.spec-chip { font-size: 10.5px; background: var(--panel-2); border: 1px solid var(--line); color: var(--text-dim); padding: 2px 7px; border-radius: 5px; }
.opt-bottom { display: flex; justify-content: space-between; align-items: center; margin-top: 2px; }
.opt-tier { font-size: 11px; color: var(--copper-soft); font-weight: 600; }
.opt-price { font-size: 14px; font-weight: 600; }
.opt-selected-badge { display: flex; align-items: center; gap: 5px; color: var(--cyan); font-size: 11px; font-weight: 600; }

/* ---- ticket ---- */
.ticket { border-left: 1px solid var(--line); background: rgba(22,26,32,0.5); padding: 18px 16px; display: flex; flex-direction: column; gap: 14px; overflow-y: auto; }
.ticket-header { display: flex; justify-content: space-between; align-items: baseline; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 15px; }
.ticket-total { font-size: 19px; color: var(--copper-soft); }

.ticket-trace { display: flex; gap: 8px; position: relative; }
.trace-line { width: 22px; flex-shrink: 0; }
.trace-line-bg { stroke: var(--line); stroke-width: 2; }
.trace-line-fg { stroke: var(--cyan); stroke-width: 2; transition: y2 .4s ease; }
.trace-line-fg.trace-line-error { stroke: var(--red); stroke-dasharray: 4 3; }
.ticket-rows { display: flex; flex-direction: column; flex: 1; min-width: 0; }
.ticket-row {
  display: flex; align-items: center; gap: 9px; background: transparent; border: none;
  padding: 8px 4px; border-bottom: 1px solid var(--line); text-align: left; width: 100%; height: 56px;
}
.ticket-row:hover { background: var(--panel); }
.ticket-node { width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1px solid var(--line); }
.node-empty { color: #4b5460; }
.node-ok { color: var(--cyan); border-color: var(--cyan); }
.node-error { color: var(--red); border-color: var(--red); }
.ticket-text { display: flex; flex-direction: column; min-width: 0; flex: 1; }
.ticket-cat { font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-dim); }
.ticket-name { font-size: 12.5px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 190px; }
.ticket-price { font-size: 12px; color: var(--text-dim); flex-shrink: 0; }

.wattage-block { background: var(--panel); border: 1px solid var(--line); border-radius: var(--radius); padding: 12px; }
.wattage-label { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text-dim); margin-bottom: 8px; flex-wrap: wrap; }
.wattage-bar { height: 6px; background: var(--line); border-radius: 4px; overflow: hidden; }
.wattage-fill { height: 100%; background: var(--cyan); transition: width .3s ease; }
.wattage-fill.wattage-hot { background: var(--red); }

.issues-block { display: flex; flex-direction: column; gap: 7px; }
.issue-ok { display: flex; align-items: center; gap: 7px; color: var(--cyan); font-size: 12.5px; }
.issue-row { display: flex; align-items: flex-start; gap: 7px; font-size: 12px; padding: 8px 9px; border-radius: 7px; line-height: 1.4; }
.issue-error { background: rgba(242,84,91,0.1); color: #FF9DA2; }
.issue-warn { background: rgba(232,179,57,0.1); color: #F0CB7A; }
.issue-row svg { flex-shrink: 0; margin-top: 1px; }

.ticket-footer-actions { display: flex; flex-direction: column; gap: 8px; margin-top: auto; }

/* ---- mobile bar ---- */
.mobile-bar { display: none; }

/* ---- modal ---- */
.modal-backdrop { position: fixed; inset: 0; background: rgba(8,9,11,0.7); display: flex; align-items: center; justify-content: center; z-index: 50; padding: 20px; }
.modal { background: var(--panel); border: 1px solid var(--line); border-radius: 14px; width: 100%; max-width: 420px; max-height: 80vh; overflow-y: auto; }
.modal-head { display: flex; justify-content: space-between; align-items: center; padding: 16px 18px; border-bottom: 1px solid var(--line); }
.modal-head h2 { font-family: 'Space Grotesk', sans-serif; font-size: 16px; margin: 0; }
.icon-btn { background: transparent; border: 1px solid var(--line); color: var(--text-dim); border-radius: 7px; padding: 6px; display: inline-flex; }
.icon-btn:hover { color: var(--text); border-color: #444c59; }
.modal-body { padding: 18px; display: flex; flex-direction: column; gap: 12px; }
.field-label { font-size: 12px; color: var(--text-dim); }
.field-input { background: var(--panel-2); border: 1px solid var(--line); color: var(--text); border-radius: 7px; padding: 9px 11px; font-size: 13px; width: 100%; }

.saved-list { display: flex; flex-direction: column; gap: 8px; }
.saved-item { display: flex; justify-content: space-between; align-items: center; background: var(--panel-2); border: 1px solid var(--line); border-radius: 9px; padding: 10px 12px; gap: 10px; }
.saved-item-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.saved-item-name { font-size: 13px; font-weight: 600; }
.saved-item-meta { font-size: 11px; color: var(--text-dim); }
.saved-item-actions { display: flex; gap: 6px; flex-shrink: 0; }

.share-code-row { display: flex; align-items: center; justify-content: space-between; background: var(--panel-2); border: 1px dashed var(--copper); border-radius: 9px; padding: 12px 14px; }
.share-code { font-size: 20px; font-weight: 700; letter-spacing: 0.12em; color: var(--copper-soft); }
.divider { display: flex; align-items: center; gap: 10px; color: var(--text-dim); font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; }
.divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: var(--line); }
.load-code-row { display: flex; gap: 8px; }
.load-code-row .field-input { text-transform: uppercase; letter-spacing: 0.08em; }

.toast {
  position: fixed; bottom: 22px; left: 50%; transform: translateX(-50%);
  background: var(--panel-2); border: 1px solid var(--line); color: var(--text);
  padding: 10px 18px; border-radius: 8px; font-size: 13px; z-index: 60;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
}

@media (prefers-reduced-motion: reduce) {
  .trace-line-fg, .rail-progress-fill, .wattage-fill, .opt-card { transition: none !important; }
}

/* ---- responsive ---- */
@media (max-width: 1080px) {
  .layout { grid-template-columns: 200px 1fr; }
  .ticket {
    position: fixed; left: 0; right: 0; bottom: 0; top: auto; z-index: 40;
    max-height: 0; padding: 0 16px; border-left: none; border-top: 1px solid var(--line);
    transition: max-height .3s ease; background: var(--bg);
  }
  .ticket-open { max-height: 78vh; padding: 16px; overflow-y: auto; }
  .mobile-bar {
    display: flex; align-items: center; justify-content: space-between; gap: 10px;
    position: fixed; bottom: 0; left: 0; right: 0; z-index: 41;
    background: var(--copper); color: #1A1206; border: none; padding: 12px 18px;
    font-size: 13px; font-weight: 600;
  }
  .chev-up { transform: rotate(180deg); }
  .main { padding-bottom: 70px; }
}
@media (max-width: 760px) {
  .layout { grid-template-columns: 1fr; }
  .rail { flex-direction: row; overflow-x: auto; border-right: none; border-bottom: 1px solid var(--line); padding: 10px; gap: 8px; }
  .rail-progress { display: none; }
  .rail-item { flex-direction: column; align-items: flex-start; min-width: 120px; }
  .rail-cat-sel { max-width: 100px; }
  .header { padding: 10px 14px; }
  .build-name-input { order: 3; flex-basis: 100%; }
}
`;
export {
  App as default
};
