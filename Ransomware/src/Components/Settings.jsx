import React, { useState, useEffect } from "react";
import GoBack from "./GoBack";

// Inject Linux-like styles (safe on client only)
const _injectSettingsStyles = () => {
    if (typeof window === "undefined") return;
    if (document.getElementById("settings-styles")) return;
    const style = document.createElement("style");
    style.id = "settings-styles";
    style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@400;700&family=Inter:wght@300;400;600&display=swap');

        :root{
            --bg: #0f1416;
            --panel: #0b0f10;
            --muted: #94a3b8;
            --accent: #7ae582; /* linux-ish green */
            --border: rgba(255,255,255,0.04);
            --glass: rgba(255,255,255,0.02);
        }

        /* Base window */
        .linux-root {
            font-family: 'Ubuntu Mono', monospace;
            background: radial-gradient(1000px 400px at 10% 10%, rgba(122,229,130,0.04), transparent), var(--bg);
            color: #cbd5e1;
            min-height: 100vh;
        }

        /* Titlebar */
        .linux-titlebar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 14px;
            background: linear-gradient(180deg, rgba(255,255,255,0.02), transparent);
            border-bottom: 1px solid var(--border);
            -webkit-app-region: drag;
        }
        .linux-title-left {
            display:flex;
            gap:10px;
            align-items:center;
        }
        .traffic {
            display:flex;
            gap:8px;
            margin-right:8px;
        }
        .traffic .circle {
            width:12px;
            height:12px;
            border-radius:50%;
            box-shadow: 0 1px 0 rgba(0,0,0,0.6) inset;
        }
        .circle.close { background:#e06c75; }
        .circle.min { background:#e5c07b; }
        .circle.max { background:#98c379; }

        .title-text {
            font-weight:700;
            font-family: Inter, 'Ubuntu Mono', monospace;
            color: #e6eef8;
            font-size:13px;
        }
        .title-sub {
            color: var(--muted);
            font-size:11px;
            margin-left:8px;
            font-weight:400;
        }

        /* Layout */
        .linux-body {
            display:flex;
            gap:20px;
            padding:18px;
        }
        .linux-sidebar {
            width:210px;
            background: linear-gradient(180deg, rgba(255,255,255,0.015), transparent);
            border:1px solid var(--border);
            border-radius:8px;
            padding:12px;
            min-height:360px;
            box-shadow: 0 6px 18px rgba(0,0,0,0.45);
        }
        .sidebar-title {
            font-size:12px;
            color:var(--muted);
            margin-bottom:8px;
            letter-spacing:0.06em;
        }
        .category {
            padding:8px 10px;
            border-radius:6px;
            cursor:pointer;
            margin-bottom:6px;
            color:#cbd5e1;
            font-size:13px;
            display:flex;
            align-items:center;
            gap:8px;
        }
        .category:hover {
            background: rgba(122,229,130,0.03);
        }
        .category.active {
            background: linear-gradient(90deg, rgba(122,229,130,0.08), rgba(122,229,130,0.03));
            box-shadow: inset 0 0 0 1px rgba(122,229,130,0.06);
            color: #e9fff2;
            font-weight:700;
        }

        /* Panel */
        .linux-panel {
            flex:1;
            background: linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.00));
            border:1px solid var(--border);
            border-radius:10px;
            padding:16px;
            min-height:360px;
            box-shadow: 0 10px 30px rgba(3,7,10,0.6);
        }
        .panel-header {
            display:flex;
            align-items:center;
            justify-content:space-between;
            margin-bottom:12px;
        }
        .panel-title {
            font-size:16px;
            font-weight:700;
            color:#e6eef8;
        }
        .panel-sub {
            color:var(--muted);
            font-size:12px;
        }

        /* Settings rows */
        .setting-row {
            display:flex;
            align-items:center;
            justify-content:space-between;
            padding:10px 12px;
            border-radius:8px;
            border:1px solid transparent;
            margin-bottom:10px;
            background: linear-gradient(180deg, rgba(255,255,255,0.006), transparent);
        }
        .setting-row .label {
            display:flex;
            flex-direction:column;
            gap:4px;
        }
        .setting-row .label .name {
            font-size:13px;
            color:#e6eef8;
            font-weight:600;
        }
        .setting-row .label .desc {
            font-size:11px;
            color:var(--muted);
        }

        /* Input styles */
        .linux-input {
            background: #071014;
            border:1px solid rgba(255,255,255,0.04);
            color:#cfeee0;
            padding:6px 10px;
            border-radius:6px;
            min-width:180px;
            font-family: 'Ubuntu Mono', monospace;
            font-size:13px;
        }
        .linux-input:focus {
            outline: none;
            box-shadow: 0 6px 18px rgba(122,229,130,0.08);
            border-color: var(--accent);
        }

        /* Toggle (linux style) */
        .linux-toggle {
            width:40px;
            height:20px;
            border-radius:4px;
            background: rgba(255,255,255,0.03);
            display:inline-flex;
            align-items:center;
            padding:2px;
            gap:4px;
            border:1px solid rgba(255,255,255,0.02);
        }
        .linux-toggle .knob {
            width:14px;
            height:14px;
            border-radius:2px;
            background:#091012;
            box-shadow: 0 4px 12px rgba(0,0,0,0.6);
            transform: translateX(0);
            transition: transform .18s ease, background .18s ease;
            border:1px solid rgba(255,255,255,0.02);
        }
        .linux-toggle.checked {
            background: linear-gradient(90deg, rgba(122,229,130,0.16), rgba(122,229,130,0.06));
        }
        .linux-toggle.checked .knob {
            transform: translateX(18px);
            background: var(--accent);
            box-shadow: 0 6px 20px rgba(122,229,130,0.12);
        }

        /* Footer hint */
        .hint {
            margin-top:12px;
            color:var(--muted);
            font-size:12px;
        }

        /* Responsive */
        @media (max-width:720px){
            .linux-body { flex-direction:column; padding:12px; }
            .linux-sidebar { width:100%; display:flex; gap:8px; overflow-x:auto; padding:10px; }
            .category { min-width:110px; flex:0 0 auto; }
        }
    `;
    document.head.appendChild(style);
};
_injectSettingsStyles();

// Small presentational components (no heavy functionality required now)
const ToggleSetting = ({ label, desc, value }) => (
    <div className="setting-row">
        <div className="label">
            <div className="name">{label}</div>
            {desc && <div className="desc">{desc}</div>}
        </div>
        <div aria-hidden className={`linux-toggle ${value ? "checked" : ""}`}>
            <div className="knob" />
        </div>
    </div>
);

const DropdownSetting = ({ label, desc, value, options }) => (
    <div className="setting-row">
        <div className="label">
            <div className="name">{label}</div>
            {desc && <div className="desc">{desc}</div>}
        </div>
        <select className="linux-input" value={value} readOnly>
            {options.map((o) => (
                <option key={o} value={o}>
                    {o}
                </option>
            ))}
        </select>
    </div>
);

const TextInputSetting = ({ label, desc, value }) => (
    <div className="setting-row">
        <div className="label">
            <div className="name">{label}</div>
            {desc && <div className="desc">{desc}</div>}
        </div>
        <input className="linux-input" value={value} readOnly />
    </div>
);

const Settings = () => {
    // Minimal static state for visuals only
    const [selectedCategory, setSelectedCategory] = useState("Appearance");

    const settingCategories = [
        {
            name: "Appearance",
            items: [
                { id: "dark", type: "toggle", label: "Dark Theme", desc: "Terminal-first GTK vibes", value: true },
                { id: "accent", type: "dropdown", label: "Accent", desc: "System accent color", value: "green", options: ["green", "blue", "purple"] },
            ],
        },
        {
            name: "Sound",
            items: [
                { id: "volume", type: "text", label: "Volume", desc: "Master channel (0-100)", value: "75" },
            ],
        },
        {
            name: "Notifications",
            items: [{ id: "notify", type: "toggle", label: "System Notifications", desc: "Enable popups", value: false }],
        },
        {
            name: "User",
            items: [{ id: "user", type: "text", label: "Username", desc: "Local machine user", value: "linux_user" }],
        },
    ];

    const current = settingCategories.find((c) => c.name === selectedCategory) || settingCategories[0];

    return (
        <div className="linux-root">
            <div className="linux-titlebar">
                <div className="linux-title-left">
                    <div className="traffic" aria-hidden>
                        <div className="circle close" />
                        <div className="circle min" />
                        <div className="circle max" />
                    </div>
                    <div>
                        <div className="title-text">
                            Settings — system
                            <span className="title-sub">  ·  gtk-inspired · terminal-first</span>
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>v0.1</div>
                    <GoBack />
                </div>
            </div>

            <div className="linux-body">
                <aside className="linux-sidebar" aria-label="settings categories">
                    <div className="sidebar-title">CATEGORIES</div>
                    {settingCategories.map((cat) => (
                        <div
                            key={cat.name}
                            role="button"
                            tabIndex={0}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`category ${selectedCategory === cat.name ? "active" : ""}`}
                        >
                            {cat.name}
                        </div>
                    ))}
                </aside>

                <main className="linux-panel">
                    <div className="panel-header">
                        <div>
                            <div className="panel-title">{current.name}</div>
                            <div className="panel-sub">Visual configuration — aesthetic only</div>
                        </div>
                        <div className="panel-sub">no live settings</div>
                    </div>

                    <div>
                        {current.items.map((s) => {
                            switch (s.type) {
                                case "toggle":
                                    return <ToggleSetting key={s.id} label={s.label} desc={s.desc} value={s.value} />;
                                case "dropdown":
                                    return <DropdownSetting key={s.id} label={s.label} desc={s.desc} value={s.value} options={s.options} />;
                                case "text":
                                default:
                                    return <TextInputSetting key={s.id} label={s.label} desc={s.desc} value={s.value} />;
                            }
                        })}
                    </div>

                    <div className="hint">This is a static, Linux-inspired aesthetic preview. No settings are persisted.</div>
                </main>
            </div>
        </div>
    );
};

export default Settings;
