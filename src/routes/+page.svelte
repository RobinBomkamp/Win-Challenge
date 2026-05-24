<div class="home-container">
    <div class="hero-section">
        <svg
            class="trophy-svg"
            viewBox="0 0 200 240"
            xmlns="http://www.w3.org/2000/svg"
        >F
            <!-- Trophy Cup -->
            <defs>
                <linearGradient
                    id="goldGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        style="stop-color:#ffd700;stop-opacity:1"
                    />
                    <stop
                        offset="50%"
                        style="stop-color:#ffed4e;stop-opacity:1"
                    />
                    <stop
                        offset="100%"
                        style="stop-color:#d4af37;stop-opacity:1"
                    />
                </linearGradient>
                <linearGradient id="darkGold" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop
                        offset="0%"
                        style="stop-color:#d4af37;stop-opacity:1"
                    />
                    <stop
                        offset="100%"
                        style="stop-color:#b8941e;stop-opacity:1"
                    />
                </linearGradient>
            </defs>

            <!-- Left Handle -->
            <path
                d="M 35 50 Q 20 60 20 80 Q 20 100 35 110"
                fill="none"
                stroke="url(#goldGradient)"
                stroke-width="8"
                stroke-linecap="round"
            />

            <!-- Right Handle -->
            <path
                d="M 165 50 Q 180 60 180 80 Q 180 100 165 110"
                fill="none"
                stroke="url(#goldGradient)"
                stroke-width="8"
                stroke-linecap="round"
            />

            <!-- Main Cup Body -->
            <path
                d="M 50 40 L 60 120 Q 60 135 75 135 L 125 135 Q 140 135 140 120 L 150 40 Z"
                fill="url(#goldGradient)"
                stroke="url(#darkGold)"
                stroke-width="2"
            />

            <!-- Cup Rim -->
            <ellipse
                cx="100"
                cy="40"
                rx="50"
                ry="12"
                fill="url(#goldGradient)"
                stroke="url(#darkGold)"
                stroke-width="2"
            />

            <!-- Cup Rim Top Highlight -->
            <ellipse
                cx="100"
                cy="37"
                rx="45"
                ry="8"
                fill="#ffed4e"
                opacity="0.6"
            />

            <!-- Decorative Band -->
            <rect
                x="55"
                y="65"
                width="90"
                height="8"
                fill="url(#darkGold)"
                rx="2"
            />

            <!-- Star on Cup -->
            <path
                d="M 100 75 L 105 90 L 120 90 L 108 98 L 113 113 L 100 105 L 87 113 L 92 98 L 80 90 L 95 90 Z"
                fill="#ffffff"
                opacity="0.8"
            />

            <!-- Base Stand -->
            <rect
                x="70"
                y="135"
                width="60"
                height="15"
                fill="url(#goldGradient)"
                stroke="url(#darkGold)"
                stroke-width="2"
            />

            <!-- Pedestal -->
            <path
                d="M 75 150 L 70 170 L 130 170 L 125 150 Z"
                fill="url(#goldGradient)"
                stroke="url(#darkGold)"
                stroke-width="2"
            />

            <!-- Base Platform -->
            <ellipse cx="100" cy="170" rx="35" ry="8" fill="url(#darkGold)" />

            <!-- Sparkles -->
            <circle cx="45" cy="30" r="3" fill="#ffffff" opacity="0.9">
                <animate
                    attributeName="opacity"
                    values="0.5;1;0.5"
                    dur="2s"
                    repeatCount="indefinite"
                />
            </circle>
            <circle cx="155" cy="35" r="2" fill="#ffffff" opacity="0.8">
                <animate
                    attributeName="opacity"
                    values="0.3;0.9;0.3"
                    dur="1.5s"
                    repeatCount="indefinite"
                />
            </circle>
            <circle cx="100" cy="20" r="2.5" fill="#ffffff" opacity="0.9">
                <animate
                    attributeName="opacity"
                    values="0.4;1;0.4"
                    dur="1.8s"
                    repeatCount="indefinite"
                />
            </circle>
            <circle cx="160" cy="70" r="2" fill="#ffffff" opacity="0.7">
                <animate
                    attributeName="opacity"
                    values="0.5;1;0.5"
                    dur="2.2s"
                    repeatCount="indefinite"
                />
            </circle>

            <!-- Winner Ribbon -->
            <path
                d="M 85 175 L 80 210 L 90 200 L 95 210 Z"
                fill="#c41e3a"
                opacity="0.9"
            />
            <path
                d="M 115 175 L 105 210 L 110 200 L 120 210 Z"
                fill="#c41e3a"
                opacity="0.9"
            />
        </svg>

        <h1 class="title">Win Challenge</h1>
        <p class="subtitle">
            Create, track, and conquer your personal challenges
        </p>

        <a class="create-button" href="/win-challenge/new/configuration">
            <svg
                class="button-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 5V19M5 12H19"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                />
            </svg>
            Create New Challenge
        </a>
    </div>
</div>

<style>
    .home-container {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;

        height: 100%;
    }

    .hero-section {
        text-align: center;
        animation: fadeIn 0.8s ease-out;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .trophy-svg {
        width: 280px;
        height: 320px;
        margin: 0 auto 2rem;
        animation: float 3s ease-in-out infinite;
    }

    @keyframes float {
        0%,
        100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-15px);
        }
    }

    .title {
        font-size: 4rem;
        font-weight: 800;
        color: #ffffff;
        margin: 0 0 3rem;
        letter-spacing: -0.02em;
    }

    .subtitle {
        font-size: 1.5rem;
        color: rgba(255, 255, 255, 0.85);
        margin: 0 0 3rem;
        font-weight: 300;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }

    .create-button {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1.25rem 2.5rem;
        font-size: 1.25rem;
        font-weight: 600;
        color: white;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        border-radius: 50px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
		text-decoration: none;
    }

    .create-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        background: linear-gradient(135deg, #7e92f7 0%, #8b5fb5 100%);
    }

    .create-button:active {
        transform: translateY(-1px);
    }

    .button-icon {
        width: 24px;
        height: 24px;
    }

    @media (max-width: 768px) {
        .trophy-svg {
            width: 200px;
            height: 240px;
        }

        .title {
            font-size: 2.5rem;
        }

        .subtitle {
            font-size: 1.1rem;
            padding: 0 1rem;
        }

        .create-button {
            padding: 1rem 2rem;
            font-size: 1.1rem;
        }
    }
</style>
