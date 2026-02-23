// The code in this file will load on every page of your site

$w.onReady(function () {
    // Write your code heremport os
    import json

    # Create comprehensive directory structure
    base_path = "/mnt/kimi/output/ambitiously-institute-complete"
    os.makedirs(base_path, exist_ok = True)

    # Create all necessary directories
    dirs = [
        "backend-api",
        "backend-api/models",
        "backend-api/routes",
        "backend-api/middleware",
        "backend-api/seed-data",
        "frontend-widgets",
        "frontend-widgets/admin",
        "frontend-widgets/student",
        "frontend-widgets/sales",
        "email-templates",
        "sales-funnels",
        "curriculum-content",
        "deployment-scripts"
    ]

    for d in dirs:
        os.makedirs(f "{base_path}/{d}", exist_ok = True)

    print("✓ Directory structure created")
    print(f "Base: {base_path}")

    # COMPLETE CURRICULUM DATA - All courses, modules, lessons, quizzes

    complete_curriculum = {
        "programs": [{
                "id": "eba-core",
                "title": "Executive Beauty Architect",
                "subtitle": "The Complete Business Transformation Program",
                "price": 2497,
                "payment_plan": [447, 447, 447, 447, 447, 447],
                # 6 payments "description": "Transform from solo artist to 7-figure empire owner with proven systems",
                "category": "Business Mastery",
                "level": "Intermediate to Advanced",
                "duration": "12 Weeks",
                "modules": [{
                        "id": "mod-1",
                        "title": "Module 1: Foundation Architecture",
                        "description": "Build the unshakeable foundation for your beauty empire",
                        "lessons": [{
                                "id": "l1-1",
                                "title": "The Architect's Mindset",
                                "type": "video",
                                "duration": 45,
                                "content": "Shifting from technician to executive thinking. Understanding leverage, systems, and scalability.",
                                "resources": [
                                    { "title": "Mindset Shift Workbook", "type": "pdf" },
                                    { "title": "CEO Daily Planner", "type": "template" }
                                ]
                            },
                            {
                                "id": "l1-2",
                                "title": "Business Model Design",
                                "type": "video",
                                "duration": 52,
                                "content": "Choosing your empire architecture: studio, mobile, hybrid, or multi-location. Revenue model selection.",
                                "resources": [
                                    { "title": "Business Model Canvas", "type": "worksheet" },
                                    { "title": "Revenue Calculator", "type": "spreadsheet" }
                                ]
                            },
                            {
                                "id": "l1-3",
                                "title": "Financial Infrastructure",
                                "type": "video",
                                "duration": 38,
                                "content": "Business banking, accounting systems, tax structure, financial tracking dashboards.",
                                "resources": [
                                    { "title": "Financial Setup Checklist", "type": "pdf" },
                                    { "title": "Profit First Template", "type": "spreadsheet" }
                                ]
                            },
                            {
                                "id": "l1-4",
                                "title": "Legal & Compliance Framework",
                                "type": "video",
                                "duration": 41,
                                "content": "Business structure, contracts, insurance, liability protection, regulatory compliance.",
                                "resources": [
                                    { "title": "Contract Templates", "type": "doc" },
                                    { "title": "Compliance Checklist", "type": "pdf" }
                                ]
                            },
                            {
                                "id": "l1-5",
                                "title": "Brand Positioning Strategy",
                                "type": "video",
                                "duration": 48,
                                "content": "Creating your unique market position. Premium vs. volume strategies. Brand differentiation.",
                                "resources": [
                                    { "title": "Brand Positioning Worksheet", "type": "pdf" },
                                    { "title": "Competitive Analysis Template", "type": "spreadsheet" }
                                ]
                            }
                        ],
                        "quiz": {
                            "title": "Module 1 Assessment",
                            "passing_score": 80,
                            "questions": [{
                                    "question": "What is the primary difference between a technician and an executive mindset?",
                                    "options": [
                                        "Technicians focus on doing, executives focus on systems and leverage",
                                        "Technicians make less money",
                                        "Executives don't work with clients",
                                        "There is no difference"
                                    ],
                                    "correct": 0,
                                    "explanation": "The executive mindset focuses on building systems that work without you, while technicians trade time for money."
                                },
                                {
                                    "question": "Which business model typically has the highest profit margins?",
                                    "options": [
                                        "Mobile services",
                                        "Home-based studio",
                                        "Premium boutique studio",
                                        "Commission-based rental"
                                    ],
                                    "correct": 2,
                                    "explanation": "Premium boutique studios with strong positioning can command 3-5x standard rates with controlled overhead."
                                },
                                {
                                    "question": "What is the recommended business structure for a growing beauty business?",
                                    "options": [
                                        "Sole proprietorship forever",
                                        "LLC or S-Corp depending on revenue",
                                        "C-Corp from day one",
                                        "Partnership with no agreement"
                                    ],
                                    "correct": 1,
                                    "explanation": "LLC provides liability protection; S-Corp election saves on self-employment taxes above $60K revenue."
                                }
                            ]
                        }
                    },
                    {
                        "id": "mod-2",
                        "title": "Module 2: Client Acquisition Systems",
                        "description": "Build automated marketing that brings ideal clients consistently",
                        "lessons": [{
                                "id": "l2-1",
                                "title": "Ideal Client Avatar",
                                "type": "video",
                                "duration": 35,
                                "content": "Defining your perfect client: demographics, psychographics, pain points, desires, buying behavior.",
                                "resources": [
                                    { "title": "Client Avatar Worksheet", "type": "pdf" },
                                    { "title": "Avatar Interview Script", "type": "doc" }
                                ]
                            },
                            {
                                "id": "l2-2",
                                "title": "Instagram Domination Strategy",
                                "type": "video",
                                "duration": 58,
                                "content": "Content pillars, posting strategy, Stories, Reels, engagement tactics, growth hacking.",
                                "resources": [
                                    { "title": "30-Day Content Calendar", "type": "spreadsheet" },
                                    { "title": "Hashtag Bank", "type": "doc" },
                                    { "title": "Caption Templates", "type": "doc" }
                                ]
                            },
                            {
                                "id": "l2-3",
                                "title": "Lead Generation Engines",
                                "type": "video",
                                "duration": 47,
                                "content": "Freebie creation, landing pages, email capture, lead magnets that convert.",
                                "resources": [
                                    { "title": "Lead Magnet Templates", "type": "canva" },
                                    { "title": "Landing Page Copy", "type": "doc" },
                                    { "title": "Email Sequence", "type": "doc" }
                                ]
                            },
                            {
                                "id": "l2-4",
                                "title": "Conversion Architecture",
                                "type": "video",
                                "duration": 44,
                                "content": "Sales pages, booking systems, consultation calls, objection handling, closing techniques.",
                                "resources": [
                                    { "title": "Sales Script", "type": "doc" },
                                    { "title": "Objection Handler", "type": "pdf" },
                                    { "title": "Booking Funnel Map", "type": "pdf" }
                                ]
                            },
                            {
                                "id": "l2-5",
                                "title": "Retention Mathematics",
                                "type": "video",
                                "duration": 39,
                                "content": "Lifetime value calculation, retention strategies, loyalty programs, referral systems.",
                                "resources": [
                                    { "title": "LTV Calculator", "type": "spreadsheet" },
                                    { "title": "Retention Email Sequence", "type": "doc" },
                                    { "title": "Referral Program Template", "type": "pdf" }
                                ]
                            }
                        ],
                        "quiz": {
                            "title": "Module 2 Assessment",
                            "passing_score": 80,
                            "questions": [{
                                    "question": "What is the most important metric for marketing success?",
                                    "options": [
                                        "Number of followers",
                                        "Engagement rate",
                                        "Cost per acquisition vs lifetime value",
                                        "Post frequency"
                                    ],
                                    "correct": 2,
                                    "explanation": "CAC vs LTV determines profitability. You can have millions of followers but if acquisition costs exceed lifetime value, you lose money."
                                },
                                {
                                    "question": "How often should you post on Instagram for optimal growth?",
                                    "options": [
                                        "Once per week",
                                        "Daily feed posts + 3-5 stories",
                                        "3 times per day",
                                        "Whenever you feel like it"
                                    ],
                                    "correct": 1,
                                    "explanation": "Consistency with daily feed posts and frequent Stories maintains algorithm favor and audience connection."
                                }
                            ]
                        }
                    },
                    {
                        "id": "mod-3",
                        "title": "Module 3: Service Delivery Excellence",
                        "description": "Create systems that deliver premium experiences consistently",
                        "lessons": [{
                                "id": "l3-1",
                                "title": "Standard Operating Procedures",
                                "type": "video",
                                "duration": 42,
                                "content": "Documenting every process: consultation, service, checkout, follow-up. Creating training manuals.",
                                "resources": [
                                    { "title": "SOP Template Library", "type": "doc" },
                                    { "title": "Process Documentation Guide", "type": "pdf" }
                                ]
                            },
                            {
                                "id": "l3-2",
                                "title": "Client Experience Design",
                                "type": "video",
                                "duration": 51,
                                "content": "Journey mapping, touchpoint optimization, surprise and delight moments, luxury positioning.",
                                "resources": [
                                    { "title": "Experience Map Template", "type": "pdf" },
                                    { "title": "Touchpoint Checklist", "type": "doc" }
                                ]
                            },
                            {
                                "id": "l3-3",
                                "title": "Quality Control Systems",
                                "type": "video",
                                "duration": 37,
                                "content": "Service standards, inspection checklists, feedback loops, continuous improvement.",
                                "resources": [
                                    { "title": "Quality Control Checklist", "type": "pdf" },
                                    { "title": "Feedback Form Template", "type": "doc" }
                                ]
                            },
                            {
                                "id": "l3-4",
                                "title": "Upsell & Cross-Sell Frameworks",
                                "type": "video",
                                "duration": 46,
                                "content": "Service upgrades, retail sales, package deals, membership programs, ascension models.",
                                "resources": [
                                    { "title": "Upsell Script", "type": "doc" },
                                    { "title": "Package Pricing Calculator", "type": "spreadsheet" },
                                    { "title": "Membership Structure", "type": "pdf" }
                                ]
                            }
                        ],
                        "quiz": {
                            "title": "Module 3 Assessment",
                            "passing_score": 80,
                            "questions": [{
                                "question": "What is the primary purpose of SOPs?",
                                "options": [
                                    "To micromanage employees",
                                    "To ensure consistency and enable delegation",
                                    "To create paperwork",
                                    "To impress clients"
                                ],
                                "correct": 1,
                                "explanation": "SOPs ensure every client gets the same premium experience and allow you to delegate without quality loss."
                            }]
                        }
                    },
                    {
                        "id": "mod-4",
                        "title": "Module 4: Team Architecture",
                        "description": "Hire, train, and lead a high-performing team",
                        "lessons": [{
                                "id": "l4-1",
                                "title": "When & Who to Hire First",
                                "type": "video",
                                "duration": 44,
                                "content": "Hiring timeline, role prioritization, assistant vs associate vs specialist decisions.",
                                "resources": [
                                    { "title": "Hiring Roadmap", "type": "pdf" },
                                    { "title": "Role Definition Templates", "type": "doc" }
                                ]
                            },
                            {
                                "id": "l4-2",
                                "title": "Recruitment Systems",
                                "type": "video",
                                "duration": 49,
                                "content": "Job postings, interview processes, skills testing, culture fit assessment, reference checks.",
                                "resources": [
                                    { "title": "Interview Script", "type": "doc" },
                                    { "title": "Skills Assessment", "type": "pdf" },
                                    { "title": "Job Description Templates", "type": "doc" }
                                ]
                            },
                            {
                                "id": "l4-3",
                                "title": "Training & Onboarding",
                                "type": "video",
                                "duration": 53,
                                "content": "90-day onboarding plan, training schedules, competency checks, mentorship structure.",
                                "resources": [
                                    { "title": "Onboarding Checklist", "type": "pdf" },
                                    { "title": "Training Schedule Template", "type": "spreadsheet" },
                                    { "title": "Competency Tracker", "type": "doc" }
                                ]
                            },
                            {
                                "id": "l4-4",
                                "title": "Leadership & Culture",
                                "type": "video",
                                "duration": 48,
                                "content": "Communication rhythms, feedback systems, motivation strategies, conflict resolution, culture maintenance.",
                                "resources": [
                                    { "title": "Meeting Agenda Templates", "type": "doc" },
                                    { "title": "Feedback Framework", "type": "pdf" },
                                    { "title": "Culture Code Worksheet", "type": "pdf" }
                                ]
                            }
                        ],
                        "quiz": {
                            "title": "Module 4 Assessment",
                            "passing_score": 80,
                            "questions": [{
                                "question": "What is the most important factor in hiring?",
                                "options": [
                                    "Technical skills only",
                                    "Culture fit and attitude",
                                    "Years of experience",
                                    "Availability"
                                ],
                                "correct": 1,
                                "explanation": "Skills can be taught. Culture fit and attitude determine long-term success and team harmony."
                            }]
                        }
                    },
                    {
                        "id": "mod-5",
                        "title": "Module 5: Scale & Exit",
                        "description": "Expand to multiple locations or create passive income streams",
                        "lessons": [{
                                "id": "l5-1",
                                "title": "Multi-Location Expansion",
                                "type": "video",
                                "duration": 56,
                                "content": "Location selection, duplication systems, area management, maintaining quality at scale.",
                                "resources": [
                                    { "title": "Location Analysis Scorecard", "type": "spreadsheet" },
                                    { "title": "Expansion Checklist", "type": "pdf" }
                                ]
                            },
                            {
                                "id": "l5-2",
                                "title": "Franchise & Licensing Models",
                                "type": "video",
                                "duration": 62,
                                "content": "Franchise development, licensing agreements, IP protection, franchisee support systems.",
                                "resources": [
                                    { "title": "Franchise Disclosure Document", "type": "doc" },
                                    { "title": "Operations Manual Template", "type": "doc" }
                                ]
                            },
                            {
                                "id": "l5-3",
                                "title": "Passive Income Streams",
                                "type": "video",
                                "duration": 45,
                                "content": "Online courses, product lines, certification programs, software tools, investment strategies.",
                                "resources": [
                                    { "title": "Passive Income Calculator", "type": "spreadsheet" },
                                    { "title": "Digital Product Planning", "type": "pdf" }
                                ]
                            },
                            {
                                "id": "l5-4",
                                "title": "Exit Strategy & Valuation",
                                "type": "video",
                                "duration": 51,
                                "content": "Business valuation, sale preparation, broker selection, deal structure, transition planning.",
                                "resources": [
                                    { "title": "Valuation Calculator", "type": "spreadsheet" },
                                    { "title": "Exit Planning Checklist", "type": "pdf" }
                                ]
                            }
                        ],
                        "quiz": {
                            "title": "Module 5 Assessment",
                            "passing_score": 80,
                            "questions": [{
                                "question": "What is the key to successful multi-location expansion?",
                                "options": [
                                    "Finding cheap rent",
                                    "Documented systems that ensure consistency",
                                    "Hiring friends and family",
                                    "Copying competitors exactly"
                                ],
                                "correct": 1,
                                "explanation": "Systems ensure each location delivers the same quality experience without your direct involvement."
                            }]
                        }
                    }
                ],
                "bonuses": [{
                        "title": "Swipe File Library",
                        "description": "200+ proven social media posts, email templates, and sales scripts",
                        "value": 997
                    },
                    {
                        "title": "Tech Stack Setup",
                        "description": "Step-by-step tutorials for every software tool you need",
                        "value": 497
                    },
                    {
                        "title": "Private Community Access",
                        "description": "Lifetime access to the Executive Beauty Architect community",
                        "value": 1200
                    },
                    {
                        "title": "Monthly Group Coaching",
                        "description": "12 months of live group coaching calls",
                        "value": 2400
                    }
                ],
                "total_value": 12591,
                "guarantee": "30-Day Architect's Promise - Full implementation support"
            },
            {
                "id": "lash-mastery",
                "title": "Lash Mastery Pro",
                "subtitle": "Technical Excellence & Business Systems for Lash Artists",
                "price": 997,
                "payment_plan": [197, 197, 197, 197, 197],
                "description": "Master lash techniques while building a booked-solid business",
                "category": "Technical + Business",
                "level": "Beginner to Intermediate",
                "duration": "8 Weeks",
                "modules": [{
                        "id": "lash-mod-1",
                        "title": "Foundations & Safety",
                        "lessons": [
                            { "id": "lash-l1", "title": "Anatomy of the Eye & Lash", "duration": 35 },
                            { "id": "lash-l2", "title": "Product Chemistry & Selection", "duration": 42 },
                            { "id": "lash-l3", "title": "Sanitation & Safety Protocols", "duration": 38 },
                            { "id": "lash-l4", "title": "Client Consultation & Contraindications", "duration": 29 }
                        ]
                    },
                    {
                        "id": "lash-mod-2",
                        "title": "Classic Lash Mastery",
                        "lessons": [
                            { "id": "lash-l5", "title": "Isolation Techniques", "duration": 45 },
                            { "id": "lash-l6", "title": "Adhesive Control & Placement", "duration": 52 },
                            { "id": "lash-l7", "title": "Mapping & Design", "duration": 48 },
                            { "id": "lash-l8", "title": "Classic Full Set Application", "duration": 65 }
                        ]
                    },
                    {
                        "id": "lash-mod-3",
                        "title": "Volume & Hybrid Techniques",
                        "lessons": [
                            { "id": "lash-l9", "title": "Fan Making Methods", "duration": 58 },
                            { "id": "lash-l10", "title": "Volume Attachment", "duration": 54 },
                            { "id": "lash-l11", "title": "Hybrid Design", "duration": 47 },
                            { "id": "lash-l12", "title": "Mega Volume Advanced", "duration": 61 }
                        ]
                    },
                    {
                        "id": "lash-mod-4",
                        "title": "Business Systems for Lash Artists",
                        "lessons": [
                            { "id": "lash-l13", "title": "Pricing for Profit", "duration": 39 },
                            { "id": "lash-l14", "title": "Booking & Scheduling Systems", "duration": 33 },
                            { "id": "lash-l15", "title": "Client Retention Strategies", "duration": 41 },
                            { "id": "lash-l16", "title": "Instagram for Lash Artists", "duration": 55 }
                        ]
                    }
                ]
            },
            {
                "id": "brow-architect",
                "title": "Brow Architect Certification",
                "subtitle": "Microblading, Shading & Business Mastery",
                "price": 1497,
                "payment_plan": [297, 297, 297, 297, 297, 297],
                "description": "Complete brow artistry training with business systems",
                "category": "Technical Certification",
                "level": "Intermediate",
                "duration": "10 Weeks",
                "modules": [{
                        "id": "brow-mod-1",
                        "title": "Brow Design Fundamentals",
                        "lessons": [
                            { "id": "brow-l1", "title": "Face Shape & Brow Mapping", "duration": 44 },
                            { "id": "brow-l2", "title": "Color Theory & Skin Undertones", "duration": 38 },
                            { "id": "brow-l3", "title": "Golden Ratio Measurements", "duration": 41 }
                        ]
                    },
                    {
                        "id": "brow-mod-2",
                        "title": "Microblading Mastery",
                        "lessons": [
                            { "id": "brow-l4", "title": "Blade Selection & Configuration", "duration": 36 },
                            { "id": "brow-l5", "title": "Hair Stroke Patterns", "duration": 52 },
                            { "id": "brow-l6", "title": "Depth & Pressure Control", "duration": 48 },
                            { "id": "brow-l7", "title": "Live Model Application", "duration": 90 }
                        ]
                    },
                    {
                        "id": "brow-mod-3",
                        "title": "Machine Shading Techniques",
                        "lessons": [
                            { "id": "brow-l8", "title": "Powder Brow Technique", "duration": 55 },
                            { "id": "brow-l9", "title": "Ombre Shading", "duration": 49 },
                            { "id": "brow-l10", "title": "Combination Brows", "duration": 58 }
                        ]
                    }
                ]
            }
        ]
    }

    # Save curriculum data
    with open(f "{base_path}/curriculum-content/complete-curriculum.json", "w") as f:
        json.dump(complete_curriculum, f, indent = 2)

    print("✓ Complete curriculum data created")
    print(f " Programs: {len(complete_curriculum['programs'])}")
    print(f " Total Modules: {sum(len(p.get('modules', [])) for p in complete_curriculum['programs'])}")
    print(f " Total Lessons: {sum(sum(len(m.get('lessons', [])) for m in p.get('modules', [])) for p in complete_curriculum['programs'])}")

    # COMPLETE BACKEND API with all features

    # Enhanced server.js with all routes
    server_js = ""
    "const express = require('express');
    const cors = require('cors');
    const mongoose = require('mongoose');
    const helmet = require('helmet');
    const compression = require('compression');
    const rateLimit = require('express-rate-limit');
    require('dotenv').config();

    const app = express();

    // Security middleware
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                connectSrc: ["'self'", "https://*.wixsite.com", "https://*.wix.com", "https://*.stripe.com"],
                scriptSrc: ["'self'", "'unsafe-inline'", "https://js.stripe.com"],
                frameSrc: ["'self'", "https://js.stripe.com"],
            },
        },
    }));

    app.use(compression());

    // Rate limiting
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
    });
    app.use('/api/', limiter);

    // CORS configuration
    app.use(cors({
        origin: process.env.ALLOWED_ORIGINS?.split(',') || [
            'https://cnsbeauty.wixsite.com',
            'https://www.ambitiouslybybobo.com',
            'http://localhost:3000'
        ],
        credentials: true
    }));

    app.use(express.json({ limit: '10mb' }));
    app.use(express.static('public'));

    // Database connection with retry logic
    const connectDB = async () => {
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('✓ MongoDB Connected');

            // Seed data if empty
            const Course = require('./models/Course');
            const count = await Course.countDocuments();
            if (count === 0) {
                console.log('Seeding database...');
                await require('./seed-data/seed')();
                console.log('✓ Database seeded');
            }
        } catch (err) {
            console.error('MongoDB Error:', err);
            setTimeout(connectDB, 5000);
        }
    };

    connectDB();

    // Health check
    app.get('/api/health', (req, res) => {
        res.json({
            status: 'OK',
            timestamp: new Date().toISOString(),
            version: '1.0.0'
        });
    });

    // Routes
    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/courses', require('./routes/courses'));
    app.use('/api/quizzes', require('./routes/quizzes'));
    app.use('/api/payments', require('./routes/payments'));
    app.use('/api/progress', require('./routes/progress'));
    app.use('/api/admin', require('./routes/admin'));
    app.use('/api/analytics', require('./routes/analytics'));
    app.use('/api/affiliates', require('./routes/affiliates'));
    app.use('/api/webhooks', require('./routes/webhooks'));

    // Error handling
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({
            error: 'Internal server error',
            message: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`✓ Ambitiously Institute API running on port ${PORT}`);
        console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
    });
    ""
    "

    # Enhanced models with affiliate tracking
    user_model = ""
    "const mongoose = require('mongoose');
    const bcrypt = require('bcryptjs');

    const userSchema = new mongoose.Schema({
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        phone: String,
        role: { type: String, enum: ['student', 'admin', 'affiliate'], default: 'student' },

        // Enrollment tracking
        enrolledCourses: [{
            courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
            enrolledAt: { type: Date, default: Date.now },
            paymentPlan: String,
            amountPaid: Number,
            totalAmount: Number,
            status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' }
        }],

        // Affiliate tracking
        affiliateCode: { type: String, unique: true, sparse: true },
        affiliateEarnings: { type: Number, default: 0 },
        affiliateSales: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }],
        referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

        // Engagement
        lastLogin: Date,
        loginCount: { type: Number, default: 0 },
        timezone: String,

        // Marketing
        leadSource: String,
        utmData: {
            source: String,
            medium: String,
            campaign: String
        },

        // Preferences
        emailPreferences: {
            marketing: { type: Boolean, default: true },
            courseUpdates: { type: Boolean, default: true },
            communityNotifications: { type: Boolean, default: true }
        }
    }, { timestamps: true });

    userSchema.pre('save', async function (next) {
        if (!this.isModified('password')) return next();
        this.password = await bcrypt.hash(this.password, 12);
        next();
    });

    userSchema.methods.comparePassword = async function (candidatePassword) {
        return await bcrypt.compare(candidatePassword, this.password);
    };

    userSchema.methods.generateAffiliateCode = function () {
        return `${this.firstName.toLowerCase()}${this.lastName.toLowerCase()}${Math.random().toString(36).substring(2, 6)}`;
    };

    module.exports = mongoose.model('User', userSchema);
    ""
    "

    # Enhanced course model with upsells
    enhanced_course_model = ""
    "const mongoose = require('mongoose');

    const lessonSchema = new mongoose.Schema({
        id: String,
        title: String,
        type: { type: String, enum: ['video', 'audio', 'text', 'quiz', 'assignment'] },
        duration: Number,
        content: String,
        videoUrl: String,
        resources: [{
            title: String,
            url: String,
            type: String
        }],
        order: Number,
        isPreview: { type: Boolean, default: false }
    });

    const moduleSchema = new mongoose.Schema({
        id: String,
        title: String,
        description: String,
        lessons: [lessonSchema],
        quiz: {
            title: String,
            passingScore: Number,
            questions: [{
                question: String,
                type: String,
                options: [String],
                correctAnswer: Number,
                explanation: String
            }]
        },
        order: Number
    });

    const courseSchema = new mongoose.Schema({
        id: String,
        title: { type: String, required: true },
        subtitle: String,
        description: String,
        shortDescription: String,
        price: { type: Number, required: true },
        comparePrice: Number,
        paymentPlan: [Number],

        // Content
        modules: [moduleSchema],
        category: String,
        level: String,
        duration: String,

        // Media
        thumbnail: String,
        trailerVideo: String,

        // Marketing
        salesPage: {
            headline: String,
            subheadline: String,
            problem: String,
            solution: String,
            testimonials: [{
                name: String,
                photo: String,
                text: String,
                result: String
            }],
            faq: [{ question: String, answer: String }]
        },

        // Revenue optimization
        upsells: [{
            courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
            discount: Number,
            description: String
        }],
        orderBump: {
            name: String,
            description: String,
            price: Number
        },

        // Bonuses
        bonuses: [{
            title: String,
            description: String,
            value: Number,
            deliveryMethod: String
        }],

        // Access control
        isPublished: { type: Boolean, default: false },
        publishDate: Date,
        enrollmentCloseDate: Date,

        // Stats
        enrolledCount: { type: Number, default: 0 },
        completionRate: { type: Number, default: 0 },
        averageRating: { type: Number, default: 0 },
        reviewCount: { type: Number, default: 0 }
    }, { timestamps: true });

    module.exports = mongoose.model('Course', courseSchema);
    ""
    "

    # Payment model with affiliate tracking
    payment_model = ""
    "const mongoose = require('mongoose');

    const paymentSchema = new mongoose.Schema({
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },

        // Payment details
        amount: Number,
        currency: { type: String, default: 'USD' },
        paymentMethod: String,
        paymentIntentId: String,
        subscriptionId: String,

        // Payment plan tracking
        isPaymentPlan: { type: Boolean, default: false },
        totalPayments: Number,
        paymentNumber: Number,
        nextPaymentDate: Date,

        // Status
        status: {
            type: String,
            enum: ['pending', 'completed', 'failed', 'refunded', 'cancelled'],
            default: 'pending'
        },

        // Affiliate tracking
        affiliateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        affiliateCommission: Number,

        // Order bump
        orderBump: {
            name: String,
            amount: Number
        },

        // Refund tracking
        refundedAt: Date,
        refundAmount: Number,
        refundReason: String,

        // Metadata
        ipAddress: String,
        userAgent: String,
        couponCode: String,
        discountApplied: Number
    }, { timestamps: true });

    module.exports = mongoose.model('Payment', paymentSchema);
    ""
    "

    # Progress model
    progress_model = ""
    "const mongoose = require('mongoose');

    const progressSchema = new mongoose.Schema({
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },

        // Module progress
        completedLessons: [{
            moduleId: String,
            lessonId: String,
            completedAt: Date,
            timeSpent: Number
        }],

        // Quiz results
        quizScores: [{
            moduleId: String,
            score: Number,
            passed: Boolean,
            attempts: Number,
            completedAt: Date
        }],

        // Overall progress
        overallProgress: { type: Number, default: 0 },
        startedAt: { type: Date, default: Date.now },
        completedAt: Date,
        lastAccessed: { type: Date, default: Date.now },

        // Engagement
        totalTimeSpent: { type: Number, default: 0 },
        streakDays: { type: Number, default: 0 },
        lastStreakDate: Date,

        // Certificates
        certificateIssued: { type: Boolean, default: false },
        certificateUrl: String,
        certificateIssuedAt: Date
    }, { timestamps: true });

    progressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

    module.exports = mongoose.model('Progress', progressSchema);
    ""
    "

    # Write all model files
    with open(f "{base_path}/backend-api/server.js", "w") as f:
        f.write(server_js)
    with open(f "{base_path}/backend-api/models/User.js", "w") as f:
        f.write(user_model)
    with open(f "{base_path}/backend-api/models/Course.js", "w") as f:
        f.write(enhanced_course_model)
    with open(f "{base_path}/backend-api/models/Payment.js", "w") as f:
        f.write(payment_model)
    with open(f "{base_path}/backend-api/models/Progress.js", "w") as f:
        f.write(progress_model)

    print("✓ Enhanced backend models created")

    # COMPLETE ROUTES - All API endpoints

    # Auth routes with affiliate tracking
    auth_routes = ""
    "const express = require('express');
    const router = express.Router();
    const jwt = require('jsonwebtoken');
    const { body, validationResult } = require('express-validator');
    const User = require('../models/User');
    const auth = require('../middleware/auth');

    // Register with affiliate tracking
    router.post('/register', [
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({ min: 8 }),
        body('firstName').trim().notEmpty(),
        body('lastName').trim().notEmpty()
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email, password, firstName, lastName, phone, affiliateCode, leadSource, utmData } = req.body;

            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ error: 'Email already registered' });
            }

            // Check for referring affiliate
            let referredBy = null;
            if (affiliateCode) {
                const affiliate = await User.findOne({ affiliateCode });
                if (affiliate) {
                    referredBy = affiliate._id;
                }
            }

            user = new User({
                email,
                password,
                firstName,
                lastName,
                phone,
                referredBy,
                leadSource,
                utmData,
                emailPreferences: {
                    marketing: true,
                    courseUpdates: true,
                    communityNotifications: true
                }
            });

            await user.save();

            // Generate token
            const token = jwt.sign({ userId: user._id, email: user.email, role: user.role },
                process.env.JWT_SECRET, { expiresIn: '7d' }
            );

            res.json({
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    enrolledCourses: user.enrolledCourses
                }
            });
        } catch (err) {
            console.error('Registration error:', err);
            res.status(500).json({ error: 'Server error during registration' });
        }
    });

    // Login
    router.post('/login', async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            // Update engagement stats
            user.lastLogin = new Date();
            user.loginCount += 1;
            await user.save();

            const token = jwt.sign({ userId: user._id, email: user.email, role: user.role },
                process.env.JWT_SECRET, { expiresIn: '7d' }
            );

            res.json({
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    enrolledCourses: user.enrolledCourses,
                    affiliateCode: user.affiliateCode,
                    affiliateEarnings: user.affiliateEarnings
                }
            });
        } catch (err) {
            console.error('Login error:', err);
            res.status(500).json({ error: 'Server error during login' });
        }
    });

    // Get current user
    router.get('/me', auth, async (req, res) => {
        try {
            const user = await User.findById(req.user.userId)
                .select('-password')
                .populate('enrolledCourses.courseId', 'title thumbnail');
            res.json(user);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Update profile
    router.put('/profile', auth, [
        body('firstName').optional().trim(),
        body('lastName').optional().trim(),
        body('phone').optional().trim()
    ], async (req, res) => {
        try {
            const updates = {};
            if (req.body.firstName) updates.firstName = req.body.firstName;
            if (req.body.lastName) updates.lastName = req.body.lastName;
            if (req.body.phone) updates.phone = req.body.phone;
            if (req.body.timezone) updates.timezone = req.body.timezone;

            const user = await User.findByIdAndUpdate(
                req.user.userId,
                updates, { new: true }
            ).select('-password');

            res.json(user);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Generate affiliate code
    router.post('/affiliate/activate', auth, async (req, res) => {
        try {
            const user = await User.findById(req.user.userId);

            if (user.affiliateCode) {
                return res.json({ affiliateCode: user.affiliateCode });
            }

            user.affiliateCode = user.generateAffiliateCode();
            user.role = 'affiliate';
            await user.save();

            res.json({ affiliateCode: user.affiliateCode });
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Change password
    router.put('/password', auth, [
        body('currentPassword').notEmpty(),
        body('newPassword').isLength({ min: 8 })
    ], async (req, res) => {
        try {
            const { currentPassword, newPassword } = req.body;
            const user = await User.findById(req.user.userId);

            const isMatch = await user.comparePassword(currentPassword);
            if (!isMatch) {
                return res.status(400).json({ error: 'Current password is incorrect' });
            }

            user.password = newPassword;
            await user.save();

            res.json({ message: 'Password updated successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    module.exports = router;
    ""
    "

    # Course routes with upsells
    courses_routes = ""
    "const express = require('express');
    const router = express.Router();
    const Course = require('../models/Course');
    const auth = require('../middleware/auth');

    // Get all published courses (public)
    router.get('/', async (req, res) => {
        try {
            const courses = await Course.find({ isPublished: true })
                .select('-modules.lessons.videoUrl -modules.quiz.questions.correctAnswer')
                .sort({ createdAt: -1 });
            res.json(courses);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Get single course with full content (enrolled users only)
    router.get('/:id', auth, async (req, res) => {
        try {
            const user = await User.findById(req.user.userId);
            const isEnrolled = user.enrolledCourses.some(e => e.courseId.toString() === req.params.id);

            let course;
            if (isEnrolled || req.user.role === 'admin') {
                course = await Course.findById(req.params.id);
            } else {
                course = await Course.findById(req.params.id)
                    .select('-modules.lessons.videoUrl -modules.quiz.questions.correctAnswer');
            }

            if (!course) {
                return res.status(404).json({ error: 'Course not found' });
            }

            res.json(course);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Get course with upsells (for checkout page)
    router.get('/:id/checkout', async (req, res) => {
        try {
            const course = await Course.findById(req.params.id)
                .populate('upsells.courseId', 'title price thumbnail');

            if (!course) {
                return res.status(404).json({ error: 'Course not found' });
            }

            res.json({
                course: {
                    id: course._id,
                    title: course.title,
                    price: course.price,
                    comparePrice: course.comparePrice,
                    paymentPlan: course.paymentPlan,
                    bonuses: course.bonuses,
                    orderBump: course.orderBump
                },
                upsells: course.upsells
            });
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Get course sales page content
    router.get('/:id/sales-page', async (req, res) => {
        try {
            const course = await Course.findById(req.params.id)
                .select('title subtitle description salesPage bonuses price comparePrice');

            if (!course) {
                return res.status(404).json({ error: 'Course not found' });
            }

            res.json(course);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Admin: Create course
    router.post('/', auth, async (req, res) => {
        try {
            if (req.user.role !== 'admin') {
                return res.status(403).json({ error: 'Not authorized' });
            }

            const course = new Course(req.body);
            await course.save();
            res.json(course);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Admin: Update course
    router.put('/:id', auth, async (req, res) => {
        try {
            if (req.user.role !== 'admin') {
                return res.status(403).json({ error: 'Not authorized' });
            }

            const course = await Course.findByIdAndUpdate(
                req.params.id,
                req.body, { new: true }
            );
            res.json(course);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    module.exports = router;
    ""
    "

    # Payment routes with Stripe
    payment_routes = ""
    "const express = require('express');
    const router = express.Router();
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const auth = require('../middleware/auth');
    const User = require('../models/User');
    const Payment = require('../models/Payment');
    const Course = require('../models/Course');

    // Create payment intent
    router.post('/create-intent', auth, async (req, res) => {
        try {
            const { courseId, paymentPlan, affiliateCode, orderBump } = req.body;

            const course = await Course.findById(courseId);
            if (!course) {
                return res.status(404).json({ error: 'Course not found' });
            }

            let amount = course.price;
            let isSubscription = false;

            // Handle payment plan
            if (paymentPlan && course.paymentPlan) {
                amount = course.paymentPlan[0];
                isSubscription = true;
            }

            // Add order bump
            if (orderBump && course.orderBump) {
                amount += course.orderBump.price;
            }

            // Check for affiliate
            let affiliateId = null;
            if (affiliateCode) {
                const affiliate = await User.findOne({ affiliateCode });
                if (affiliate) {
                    affiliateId = affiliate._id;
                }
            }

            // Create payment intent
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount * 100,
                currency: 'usd',
                metadata: {
                    userId: req.user.userId,
                    courseId: courseId,
                    affiliateId: affiliateId || '',
                    isPaymentPlan: isSubscription ? 'true' : 'false',
                    orderBump: orderBump ? 'true' : 'false'
                },
                automatic_payment_methods: { enabled: true }
            });

            // Create pending payment record
            await Payment.create({
                userId: req.user.userId,
                courseId: courseId,
                amount: amount,
                paymentIntentId: paymentIntent.id,
                affiliateId: affiliateId,
                isPaymentPlan: isSubscription,
                orderBump: orderBump ? { name: course.orderBump.name, amount: course.orderBump.price } : null,
                status: 'pending'
            });

            res.json({
                clientSecret: paymentIntent.client_secret,
                amount: amount,
                isPaymentPlan: isSubscription
            });
        } catch (err) {
            console.error('Payment intent error:', err);
            res.status(500).json({ error: err.message });
        }
    });

    // Confirm enrollment after payment
    router.post('/confirm', auth, async (req, res) => {
        try {
            const { paymentIntentId } = req.body;

            const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

            if (paymentIntent.status === 'succeeded') {
                // Update payment record
                const payment = await Payment.findOneAndUpdate({ paymentIntentId }, { status: 'completed' }, { new: true });

                // Enroll user in course
                await User.findByIdAndUpdate(req.user.userId, {
                    $addToSet: {
                        enrolledCourses: {
                            courseId: payment.courseId,
                            paymentPlan: payment.isPaymentPlan ? 'plan' : 'full',
                            amountPaid: payment.amount,
                            totalAmount: payment.isPaymentPlan ? payment.amount * 6 : payment.amount
                        }
                    }
                });

                // Credit affiliate if applicable
                if (payment.affiliateId) {
                    const commission = payment.amount * 0.30; // 30% commission
                    await User.findByIdAndUpdate(payment.affiliateId, {
                        $inc: { affiliateEarnings: commission },
                        $push: { affiliateSales: payment._id }
                    });
                }

                // Update course enrollment count
                await Course.findByIdAndUpdate(payment.courseId, {
                    $inc: { enrolledCount: 1 }
                });

                res.json({ success: true, message: 'Enrollment confirmed' });
            } else {
                res.status(400).json({ error: 'Payment not completed' });
            }
        } catch (err) {
            console.error('Confirmation error:', err);
            res.status(500).json({ error: err.message });
        }
    });

    // Get payment history
    router.get('/history', auth, async (req, res) => {
        try {
            const payments = await Payment.find({ userId: req.user.userId })
                .populate('courseId', 'title thumbnail')
                .sort({ createdAt: -1 });
            res.json(payments);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    module.exports = router;
    ""
    "

    # Progress routes
    progress_routes = ""
    "const express = require('express');
    const router = express.Router();
    const Progress = require('../models/Progress');
    const Course = require('../models/Course');
    const auth = require('../middleware/auth');

    // Get all progress for user
    router.get('/', auth, async (req, res) => {
        try {
            const progress = await Progress.find({ userId: req.user.userId })
                .populate('courseId', 'title thumbnail modules');
            res.json(progress);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Get progress for specific course
    router.get('/course/:courseId', auth, async (req, res) => {
        try {
            let progress = await Progress.findOne({
                userId: req.user.userId,
                courseId: req.params.courseId
            }).populate('courseId');

            if (!progress) {
                // Create new progress record
                progress = await Progress.create({
                    userId: req.user.userId,
                    courseId: req.params.courseId,
                    overallProgress: 0
                });
                progress = await progress.populate('courseId');
            }

            res.json(progress);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Mark lesson complete
    router.post('/complete-lesson', auth, async (req, res) => {
        try {
            const { courseId, moduleId, lessonId, timeSpent } = req.body;

            const course = await Course.findById(courseId);
            const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);

            const progress = await Progress.findOneAndUpdate({ userId: req.user.userId, courseId }, {
                $addToSet: {
                    completedLessons: {
                        moduleId,
                        lessonId,
                        completedAt: new Date(),
                        timeSpent: timeSpent || 0
                    }
                },
                $inc: { totalTimeSpent: timeSpent || 0 },
                lastAccessed: new Date()
            }, { upsert: true, new: true });

            // Calculate overall progress
            const completedCount = progress.completedLessons.length;
            progress.overallProgress = Math.round((completedCount / totalLessons) * 100);

            // Check if course completed
            if (progress.overallProgress >= 100 && !progress.completedAt) {
                progress.completedAt = new Date();
                progress.certificateIssued = true;
                progress.certificateIssuedAt = new Date();
            }

            await progress.save();

            res.json(progress);
        } catch (err) {
            console.error('Progress error:', err);
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Submit quiz
    router.post('/quiz', auth, async (req, res) => {
        try {
            const { courseId, moduleId, score, passed } = req.body;

            const progress = await Progress.findOneAndUpdate({ userId: req.user.userId, courseId }, {
                $push: {
                    quizScores: {
                        moduleId,
                        score,
                        passed,
                        completedAt: new Date()
                    }
                }
            }, { upsert: true, new: true });

            res.json(progress);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Get certificate
    router.get('/certificate/:courseId', auth, async (req, res) => {
        try {
            const progress = await Progress.findOne({
                userId: req.user.userId,
                courseId: req.params.courseId
            }).populate('courseId', 'title');

            if (!progress || !progress.certificateIssued) {
                return res.status(404).json({ error: 'Certificate not found' });
            }

            res.json({
                courseName: progress.courseId.title,
                completedAt: progress.completedAt,
                certificateUrl: progress.certificateUrl || '/certificates/sample.pdf'
            });
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    module.exports = router;
    ""
    "

    # Write route files
    with open(f "{base_path}/backend-api/routes/auth.js", "w") as f:
        f.write(auth_routes)
    with open(f "{base_path}/backend-api/routes/courses.js", "w") as f:
        f.write(courses_routes)
    with open(f "{base_path}/backend-api/routes/payments.js", "w") as f:
        f.write(payment_routes)
    with open(f "{base_path}/backend-api/routes/progress.js", "w") as f:
        f.write(progress_routes)

    print("✓ All API routes created")

    # COMPLETE ROUTES - All API endpoints

    # Auth routes with affiliate tracking
    auth_routes = ""
    "const express = require('express');
    const router = express.Router();
    const jwt = require('jsonwebtoken');
    const { body, validationResult } = require('express-validator');
    const User = require('../models/User');
    const auth = require('../middleware/auth');

    // Register with affiliate tracking
    router.post('/register', [
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({ min: 8 }),
        body('firstName').trim().notEmpty(),
        body('lastName').trim().notEmpty()
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email, password, firstName, lastName, phone, affiliateCode, leadSource, utmData } = req.body;

            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ error: 'Email already registered' });
            }

            // Check for referring affiliate
            let referredBy = null;
            if (affiliateCode) {
                const affiliate = await User.findOne({ affiliateCode });
                if (affiliate) {
                    referredBy = affiliate._id;
                }
            }

            user = new User({
                email,
                password,
                firstName,
                lastName,
                phone,
                referredBy,
                leadSource,
                utmData,
                emailPreferences: {
                    marketing: true,
                    courseUpdates: true,
                    communityNotifications: true
                }
            });

            await user.save();

            // Generate token
            const token = jwt.sign({ userId: user._id, email: user.email, role: user.role },
                process.env.JWT_SECRET, { expiresIn: '7d' }
            );

            res.json({
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    enrolledCourses: user.enrolledCourses
                }
            });
        } catch (err) {
            console.error('Registration error:', err);
            res.status(500).json({ error: 'Server error during registration' });
        }
    });

    // Login
    router.post('/login', async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            // Update engagement stats
            user.lastLogin = new Date();
            user.loginCount += 1;
            await user.save();

            const token = jwt.sign({ userId: user._id, email: user.email, role: user.role },
                process.env.JWT_SECRET, { expiresIn: '7d' }
            );

            res.json({
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    enrolledCourses: user.enrolledCourses,
                    affiliateCode: user.affiliateCode,
                    affiliateEarnings: user.affiliateEarnings
                }
            });
        } catch (err) {
            console.error('Login error:', err);
            res.status(500).json({ error: 'Server error during login' });
        }
    });

    // Get current user
    router.get('/me', auth, async (req, res) => {
        try {
            const user = await User.findById(req.user.userId)
                .select('-password')
                .populate('enrolledCourses.courseId', 'title thumbnail');
            res.json(user);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Update profile
    router.put('/profile', auth, [
        body('firstName').optional().trim(),
        body('lastName').optional().trim(),
        body('phone').optional().trim()
    ], async (req, res) => {
        try {
            const updates = {};
            if (req.body.firstName) updates.firstName = req.body.firstName;
            if (req.body.lastName) updates.lastName = req.body.lastName;
            if (req.body.phone) updates.phone = req.body.phone;
            if (req.body.timezone) updates.timezone = req.body.timezone;

            const user = await User.findByIdAndUpdate(
                req.user.userId,
                updates, { new: true }
            ).select('-password');

            res.json(user);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Generate affiliate code
    router.post('/affiliate/activate', auth, async (req, res) => {
        try {
            const user = await User.findById(req.user.userId);

            if (user.affiliateCode) {
                return res.json({ affiliateCode: user.affiliateCode });
            }

            user.affiliateCode = user.generateAffiliateCode();
            user.role = 'affiliate';
            await user.save();

            res.json({ affiliateCode: user.affiliateCode });
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Change password
    router.put('/password', auth, [
        body('currentPassword').notEmpty(),
        body('newPassword').isLength({ min: 8 })
    ], async (req, res) => {
        try {
            const { currentPassword, newPassword } = req.body;
            const user = await User.findById(req.user.userId);

            const isMatch = await user.comparePassword(currentPassword);
            if (!isMatch) {
                return res.status(400).json({ error: 'Current password is incorrect' });
            }

            user.password = newPassword;
            await user.save();

            res.json({ message: 'Password updated successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    module.exports = router;
    ""
    "

    # Course routes with upsells
    courses_routes = ""
    "const express = require('express');
    const router = express.Router();
    const Course = require('../models/Course');
    const auth = require('../middleware/auth');

    // Get all published courses (public)
    router.get('/', async (req, res) => {
        try {
            const courses = await Course.find({ isPublished: true })
                .select('-modules.lessons.videoUrl -modules.quiz.questions.correctAnswer')
                .sort({ createdAt: -1 });
            res.json(courses);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Get single course with full content (enrolled users only)
    router.get('/:id', auth, async (req, res) => {
        try {
            const user = await User.findById(req.user.userId);
            const isEnrolled = user.enrolledCourses.some(e => e.courseId.toString() === req.params.id);

            let course;
            if (isEnrolled || req.user.role === 'admin') {
                course = await Course.findById(req.params.id);
            } else {
                course = await Course.findById(req.params.id)
                    .select('-modules.lessons.videoUrl -modules.quiz.questions.correctAnswer');
            }

            if (!course) {
                return res.status(404).json({ error: 'Course not found' });
            }

            res.json(course);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Get course with upsells (for checkout page)
    router.get('/:id/checkout', async (req, res) => {
        try {
            const course = await Course.findById(req.params.id)
                .populate('upsells.courseId', 'title price thumbnail');

            if (!course) {
                return res.status(404).json({ error: 'Course not found' });
            }

            res.json({
                course: {
                    id: course._id,
                    title: course.title,
                    price: course.price,
                    comparePrice: course.comparePrice,
                    paymentPlan: course.paymentPlan,
                    bonuses: course.bonuses,
                    orderBump: course.orderBump
                },
                upsells: course.upsells
            });
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Get course sales page content
    router.get('/:id/sales-page', async (req, res) => {
        try {
            const course = await Course.findById(req.params.id)
                .select('title subtitle description salesPage bonuses price comparePrice');

            if (!course) {
                return res.status(404).json({ error: 'Course not found' });
            }

            res.json(course);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Admin: Create course
    router.post('/', auth, async (req, res) => {
        try {
            if (req.user.role !== 'admin') {
                return res.status(403).json({ error: 'Not authorized' });
            }

            const course = new Course(req.body);
            await course.save();
            res.json(course);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Admin: Update course
    router.put('/:id', auth, async (req, res) => {
        try {
            if (req.user.role !== 'admin') {
                return res.status(403).json({ error: 'Not authorized' });
            }

            const course = await Course.findByIdAndUpdate(
                req.params.id,
                req.body, { new: true }
            );
            res.json(course);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    module.exports = router;
    ""
    "

    # Payment routes with Stripe
    payment_routes = ""
    "const express = require('express');
    const router = express.Router();
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const auth = require('../middleware/auth');
    const User = require('../models/User');
    const Payment = require('../models/Payment');
    const Course = require('../models/Course');

    // Create payment intent
    router.post('/create-intent', auth, async (req, res) => {
        try {
            const { courseId, paymentPlan, affiliateCode, orderBump } = req.body;

            const course = await Course.findById(courseId);
            if (!course) {
                return res.status(404).json({ error: 'Course not found' });
            }

            let amount = course.price;
            let isSubscription = false;

            // Handle payment plan
            if (paymentPlan && course.paymentPlan) {
                amount = course.paymentPlan[0];
                isSubscription = true;
            }

            // Add order bump
            if (orderBump && course.orderBump) {
                amount += course.orderBump.price;
            }

            // Check for affiliate
            let affiliateId = null;
            if (affiliateCode) {
                const affiliate = await User.findOne({ affiliateCode });
                if (affiliate) {
                    affiliateId = affiliate._id;
                }
            }

            // Create payment intent
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount * 100,
                currency: 'usd',
                metadata: {
                    userId: req.user.userId,
                    courseId: courseId,
                    affiliateId: affiliateId || '',
                    isPaymentPlan: isSubscription ? 'true' : 'false',
                    orderBump: orderBump ? 'true' : 'false'
                },
                automatic_payment_methods: { enabled: true }
            });

            // Create pending payment record
            await Payment.create({
                userId: req.user.userId,
                courseId: courseId,
                amount: amount,
                paymentIntentId: paymentIntent.id,
                affiliateId: affiliateId,
                isPaymentPlan: isSubscription,
                orderBump: orderBump ? { name: course.orderBump.name, amount: course.orderBump.price } : null,
                status: 'pending'
            });

            res.json({
                clientSecret: paymentIntent.client_secret,
                amount: amount,
                isPaymentPlan: isSubscription
            });
        } catch (err) {
            console.error('Payment intent error:', err);
            res.status(500).json({ error: err.message });
        }
    });

    // Confirm enrollment after payment
    router.post('/confirm', auth, async (req, res) => {
        try {
            const { paymentIntentId } = req.body;

            const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

            if (paymentIntent.status === 'succeeded') {
                // Update payment record
                const payment = await Payment.findOneAndUpdate({ paymentIntentId }, { status: 'completed' }, { new: true });

                // Enroll user in course
                await User.findByIdAndUpdate(req.user.userId, {
                    $addToSet: {
                        enrolledCourses: {
                            courseId: payment.courseId,
                            paymentPlan: payment.isPaymentPlan ? 'plan' : 'full',
                            amountPaid: payment.amount,
                            totalAmount: payment.isPaymentPlan ? payment.amount * 6 : payment.amount
                        }
                    }
                });

                // Credit affiliate if applicable
                if (payment.affiliateId) {
                    const commission = payment.amount * 0.30; // 30% commission
                    await User.findByIdAndUpdate(payment.affiliateId, {
                        $inc: { affiliateEarnings: commission },
                        $push: { affiliateSales: payment._id }
                    });
                }

                // Update course enrollment count
                await Course.findByIdAndUpdate(payment.courseId, {
                    $inc: { enrolledCount: 1 }
                });

                res.json({ success: true, message: 'Enrollment confirmed' });
            } else {
                res.status(400).json({ error: 'Payment not completed' });
            }
        } catch (err) {
            console.error('Confirmation error:', err);
            res.status(500).json({ error: err.message });
        }
    });

    // Get payment history
    router.get('/history', auth, async (req, res) => {
        try {
            const payments = await Payment.find({ userId: req.user.userId })
                .populate('courseId', 'title thumbnail')
                .sort({ createdAt: -1 });
            res.json(payments);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    module.exports = router;
    ""
    "

    # Progress routes
    progress_routes = ""
    "const express = require('express');
    const router = express.Router();
    const Progress = require('../models/Progress');
    const Course = require('../models/Course');
    const auth = require('../middleware/auth');

    // Get all progress for user
    router.get('/', auth, async (req, res) => {
        try {
            const progress = await Progress.find({ userId: req.user.userId })
                .populate('courseId', 'title thumbnail modules');
            res.json(progress);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Get progress for specific course
    router.get('/course/:courseId', auth, async (req, res) => {
        try {
            let progress = await Progress.findOne({
                userId: req.user.userId,
                courseId: req.params.courseId
            }).populate('courseId');

            if (!progress) {
                // Create new progress record
                progress = await Progress.create({
                    userId: req.user.userId,
                    courseId: req.params.courseId,
                    overallProgress: 0
                });
                progress = await progress.populate('courseId');
            }

            res.json(progress);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Mark lesson complete
    router.post('/complete-lesson', auth, async (req, res) => {
        try {
            const { courseId, moduleId, lessonId, timeSpent } = req.body;

            const course = await Course.findById(courseId);
            const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);

            const progress = await Progress.findOneAndUpdate({ userId: req.user.userId, courseId }, {
                $addToSet: {
                    completedLessons: {
                        moduleId,
                        lessonId,
                        completedAt: new Date(),
                        timeSpent: timeSpent || 0
                    }
                },
                $inc: { totalTimeSpent: timeSpent || 0 },
                lastAccessed: new Date()
            }, { upsert: true, new: true });

            // Calculate overall progress
            const completedCount = progress.completedLessons.length;
            progress.overallProgress = Math.round((completedCount / totalLessons) * 100);

            // Check if course completed
            if (progress.overallProgress >= 100 && !progress.completedAt) {
                progress.completedAt = new Date();
                progress.certificateIssued = true;
                progress.certificateIssuedAt = new Date();
            }

            await progress.save();

            res.json(progress);
        } catch (err) {
            console.error('Progress error:', err);
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Submit quiz
    router.post('/quiz', auth, async (req, res) => {
        try {
            const { courseId, moduleId, score, passed } = req.body;

            const progress = await Progress.findOneAndUpdate({ userId: req.user.userId, courseId }, {
                $push: {
                    quizScores: {
                        moduleId,
                        score,
                        passed,
                        completedAt: new Date()
                    }
                }
            }, { upsert: true, new: true });

            res.json(progress);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Get certificate
    router.get('/certificate/:courseId', auth, async (req, res) => {
        try {
            const progress = await Progress.findOne({
                userId: req.user.userId,
                courseId: req.params.courseId
            }).populate('courseId', 'title');

            if (!progress || !progress.certificateIssued) {
                return res.status(404).json({ error: 'Certificate not found' });
            }

            res.json({
                courseName: progress.courseId.title,
                completedAt: progress.completedAt,
                certificateUrl: progress.certificateUrl || '/certificates/sample.pdf'
            });
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    module.exports = router;
    ""
    "

    # Write route files
    with open(f "{base_path}/backend-api/routes/auth.js", "w") as f:
        f.write(auth_routes)
    with open(f "{base_path}/backend-api/routes/courses.js", "w") as f:
        f.write(courses_routes)
    with open(f "{base_path}/backend-api/routes/payments.js", "w") as f:
        f.write(payment_routes)
    with open(f "{base_path}/backend-api/routes/progress.js", "w") as f:
        f.write(progress_routes)

    print("✓ All API routes created")

    # Create remaining routes and seed data

    # Quiz routes
    quiz_routes = ""
    "const express = require('express');
    const router = express.Router();
    const Course = require('../models/Course');
    const Progress = require('../models/Progress');
    const auth = require('../middleware/auth');

    // Get quiz for module (without answers)
    router.get('/:courseId/:moduleId', auth, async (req, res) => {
        try {
            const course = await Course.findById(req.params.courseId);
            if (!course) {
                return res.status(404).json({ error: 'Course not found' });
            }

            const module = course.modules.find(m => m.id === req.params.moduleId);
            if (!module || !module.quiz) {
                return res.status(404).json({ error: 'Quiz not found' });
            }

            // Remove correct answers
            const quizWithoutAnswers = {
                title: module.quiz.title,
                passingScore: module.quiz.passingScore,
                questions: module.quiz.questions.map(q => ({
                    question: q.question,
                    type: q.type,
                    options: q.options
                }))
            };

            res.json(quizWithoutAnswers);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Submit quiz
    router.post('/submit', auth, async (req, res) => {
        try {
            const { courseId, moduleId, answers } = req.body;

            const course = await Course.findById(courseId);
            const module = course.modules.find(m => m.id === moduleId);

            if (!module || !module.quiz) {
                return res.status(404).json({ error: 'Quiz not found' });
            }

            let correct = 0;
            const total = module.quiz.questions.length;

            answers.forEach((answer, idx) => {
                if (module.quiz.questions[idx] && answer === module.quiz.questions[idx].correctAnswer) {
                    correct++;
                }
            });

            const score = Math.round((correct / total) * 100);
            const passed = score >= module.quiz.passingScore;

            // Save progress
            await Progress.findOneAndUpdate({ userId: req.user.userId, courseId }, {
                $push: {
                    quizScores: {
                        moduleId,
                        score,
                        passed,
                        completedAt: new Date()
                    }
                }
            }, { upsert: true });

            res.json({
                score,
                passed,
                correct,
                total,
                passingScore: module.quiz.passingScore,
                explanations: module.quiz.questions.map(q => q.explanation)
            });
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    module.exports = router;
    ""
    "

    # Admin routes
    admin_routes = ""
    "const express = require('express');
    const router = express.Router();
    const auth = require('../middleware/auth');
    const User = require('../models/User');
    const Course = require('../models/Course');
    const Payment = require('../models/Payment');
    const Progress = require('../models/Progress');

    // Middleware to check admin
    const isAdmin = (req, res, next) => {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Admin access required' });
        }
        next();
    };

    // Dashboard stats
    router.get('/stats', auth, isAdmin, async (req, res) => {
        try {
            const totalUsers = await User.countDocuments();
            const totalCourses = await Course.countDocuments();
            const totalRevenue = await Payment.aggregate([
                { $match: { status: 'completed' } },
                { $group: { _id: null, total: { $sum: '$amount' } } }
            ]);
            const recentPayments = await Payment.find({ status: 'completed' })
                .populate('userId', 'firstName lastName email')
                .populate('courseId', 'title')
                .sort({ createdAt: -1 })
                .limit(10);

            res.json({
                totalUsers,
                totalCourses,
                totalRevenue: totalRevenue[0]?.total || 0,
                recentPayments
            });
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Get all users
    router.get('/users', auth, isAdmin, async (req, res) => {
        try {
            const users = await User.find()
                .select('-password')
                .populate('enrolledCourses.courseId', 'title')
                .sort({ createdAt: -1 });
            res.json(users);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Get all payments
    router.get('/payments', auth, isAdmin, async (req, res) => {
        try {
            const payments = await Payment.find()
                .populate('userId', 'firstName lastName email')
                .populate('courseId', 'title')
                .populate('affiliateId', 'firstName lastName affiliateCode')
                .sort({ createdAt: -1 });
            res.json(payments);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Create course
    router.post('/courses', auth, isAdmin, async (req, res) => {
        try {
            const course = new Course(req.body);
            await course.save();
            res.json(course);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Update course
    router.put('/courses/:id', auth, isAdmin, async (req, res) => {
        try {
            const course = await Course.findByIdAndUpdate(
                req.params.id,
                req.body, { new: true }
            );
            res.json(course);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Issue refund
    router.post('/refund', auth, isAdmin, async (req, res) => {
        try {
            const { paymentId, amount, reason } = req.body;

            const payment = await Payment.findById(paymentId);
            if (!payment) {
                return res.status(404).json({ error: 'Payment not found' });
            }

            // Process Stripe refund
            const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
            await stripe.refunds.create({
                payment_intent: payment.paymentIntentId,
                amount: amount * 100
            });

            // Update payment record
            payment.status = 'refunded';
            payment.refundAmount = amount;
            payment.refundReason = reason;
            payment.refundedAt = new Date();
            await payment.save();

            res.json({ success: true });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    module.exports = router;
    ""
    "

    # Analytics routes
    analytics_routes = ""
    "const express = require('express');
    const router = express.Router();
    const auth = require('../middleware/auth');
    const Payment = require('../models/Payment');
    const User = require('../models/User');
    const Progress = require('../models/Progress');

    router.get('/revenue', auth, async (req, res) => {
        if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });

        try {
            // Daily revenue for last 30 days
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            const dailyRevenue = await Payment.aggregate([{
                    $match: {
                        status: 'completed',
                        createdAt: { $gte: thirtyDaysAgo }
                    }
                },
                {
                    $group: {
                        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                        revenue: { $sum: '$amount' },
                        count: { $sum: 1 }
                    }
                },
                { $sort: { _id: 1 } }
            ]);

            res.json(dailyRevenue);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    router.get('/engagement', auth, async (req, res) => {
        if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });

        try {
            const stats = await Progress.aggregate([{
                $group: {
                    _id: null,
                    avgProgress: { $avg: '$overallProgress' },
                    totalStudents: { $sum: 1 },
                    completedCourses: {
                        $sum: { $cond: [{ $eq: ['$overallProgress', 100] }, 1, 0] }
                    }
                }
            }]);

            res.json(stats[0]);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    module.exports = router;
    ""
    "

    # Affiliate routes
    affiliate_routes = ""
    "const express = require('express');
    const router = express.Router();
    const auth = require('../middleware/auth');
    const User = require('../models/User');
    const Payment = require('../models/Payment');

    // Get affiliate dashboard
    router.get('/dashboard', auth, async (req, res) => {
        try {
            const user = await User.findById(req.user.userId);

            if (!user.affiliateCode) {
                return res.status(400).json({ error: 'Not an affiliate' });
            }

            const sales = await Payment.find({ affiliateId: req.user.userId })
                .populate('userId', 'firstName lastName')
                .populate('courseId', 'title')
                .sort({ createdAt: -1 });

            res.json({
                affiliateCode: user.affiliateCode,
                totalEarnings: user.affiliateEarnings,
                totalSales: sales.length,
                sales
            });
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Generate affiliate link stats
    router.get('/stats', auth, async (req, res) => {
        try {
            const user = await User.findById(req.user.userId);

            if (!user.affiliateCode) {
                return res.status(400).json({ error: 'Not an affiliate' });
            }

            // Get referred users
            const referredUsers = await User.find({ referredBy: req.user.userId });

            res.json({
                clicks: referredUsers.length,
                conversions: await Payment.countDocuments({ affiliateId: req.user.userId }),
                conversionRate: referredUsers.length > 0 ?
                    (await Payment.countDocuments({ affiliateId: req.user.userId }) / referredUsers.length * 100).toFixed(2) : 0
            });
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    module.exports = router;
    ""
    "

    # Webhook routes
    for Stripe
    webhook_routes = ""
    "const express = require('express');
    const router = express.Router();
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const Payment = require('../models/Payment');
    const User = require('../models/User');

    router.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
        const sig = req.headers['stripe-signature'];
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

        let event;

        try {
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        } catch (err) {
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        // Handle events
        switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;

            // Update payment status
            await Payment.findOneAndUpdate({ paymentIntentId: paymentIntent.id }, { status: 'completed' });
            break;

        case 'payment_intent.payment_failed':
            const failedPayment = event.data.object;

            await Payment.findOneAndUpdate({ paymentIntentId: failedPayment.id }, { status: 'failed' });
            break;

        case 'invoice.payment_succeeded':
            // Handle subscription payments
            const invoice = event.data.object;
            // Update payment plan tracking
            break;
        }

        res.json({ received: true });
    });

    module.exports = router;
    ""
    "

    # Middleware
    auth_middleware = ""
    "const jwt = require('jsonwebtoken');

    module.exports = (req, res, next) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: 'No token, authorization denied' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            res.status(401).json({ error: 'Token is not valid' });
        }
    };
    ""
    "

    # Write all files
    with open(f "{base_path}/backend-api/routes/quizzes.js", "w") as f:
        f.write(quiz_routes)
    with open(f "{base_path}/backend-api/routes/admin.js", "w") as f:
        f.write(admin_routes)
    with open(f "{base_path}/backend-api/routes/analytics.js", "w") as f:
        f.write(analytics_routes)
    with open(f "{base_path}/backend-api/routes/affiliates.js", "w") as f:
        f.write(affiliate_routes)
    with open(f "{base_path}/backend-api/routes/webhooks.js", "w") as f:
        f.write(webhook_routes)
    with open(f "{base_path}/backend-api/middleware/auth.js", "w") as f:
        f.write(auth_middleware)

    print("✓ All remaining routes created")

    # Create seed data script and package.json

    seed_script = ""
    "const mongoose = require('mongoose');
    const Course = require('../models/Course');

    const seedData = async () => {
        const courses = [{
                id: 'eba-core',
                title: 'Executive Beauty Architect',
                subtitle: 'The Complete Business Transformation Program',
                description: 'Transform from solo artist to 7-figure empire owner with proven systems. This 12-week intensive covers everything from foundation to exit strategy.',
                shortDescription: 'Transform your beauty business into a scalable empire',
                price: 2497,
                comparePrice: 4997,
                paymentPlan: [447, 447, 447, 447, 447, 447],
                category: 'Business Mastery',
                level: 'Intermediate to Advanced',
                duration: '12 Weeks',
                isPublished: true,
                enrolledCount: 247,
                modules: [{
                        id: 'mod-1',
                        title: 'Module 1: Foundation Architecture',
                        description: 'Build the unshakeable foundation for your beauty empire',
                        order: 1,
                        lessons: [{
                                id: 'l1-1',
                                title: 'The Architect\'s Mindset',
                                type: 'video',
                                duration: 45,
                                content: 'Shifting from technician to executive thinking. Understanding leverage, systems, and scalability.',
                                resources: [
                                    { title: 'Mindset Shift Workbook', url: '/resources/workbook1.pdf', type: 'pdf' },
                                    { title: 'CEO Daily Planner', url: '/resources/planner.pdf', type: 'template' }
                                ],
                                order: 1
                            },
                            {
                                id: 'l1-2',
                                title: 'Business Model Design',
                                type: 'video',
                                duration: 52,
                                content: 'Choosing your empire architecture: studio, mobile, hybrid, or multi-location.',
                                resources: [
                                    { title: 'Business Model Canvas', url: '/resources/canvas.pdf', type: 'worksheet' }
                                ],
                                order: 2
                            },
                            {
                                id: 'l1-3',
                                title: 'Financial Infrastructure',
                                type: 'video',
                                duration: 38,
                                content: 'Business banking, accounting systems, tax structure, financial tracking.',
                                order: 3
                            },
                            {
                                id: 'l1-4',
                                title: 'Legal & Compliance Framework',
                                type: 'video',
                                duration: 41,
                                content: 'Business structure, contracts, insurance, liability protection.',
                                order: 4
                            },
                            {
                                id: 'l1-5',
                                title: 'Brand Positioning Strategy',
                                type: 'video',
                                duration: 48,
                                content: 'Creating your unique market position. Premium vs volume strategies.',
                                order: 5
                            }
                        ],
                        quiz: {
                            title: 'Module 1 Assessment',
                            passingScore: 80,
                            questions: [{
                                    question: 'What is the primary difference between a technician and an executive mindset?',
                                    type: 'multiple_choice',
                                    options: [
                                        'Technicians focus on doing, executives focus on systems and leverage',
                                        'Technicians make less money',
                                        'Executives don\'t work with clients',
                                        'There is no difference'
                                    ],
                                    correctAnswer: 0,
                                    explanation: 'The executive mindset focuses on building systems that work without you.'
                                },
                                {
                                    question: 'Which business model typically has the highest profit margins?',
                                    type: 'multiple_choice',
                                    options: [
                                        'Mobile services',
                                        'Home-based studio',
                                        'Premium boutique studio',
                                        'Commission-based rental'
                                    ],
                                    correctAnswer: 2,
                                    explanation: 'Premium boutiques can command 3-5x standard rates with controlled overhead.'
                                },
                                {
                                    question: 'What is the recommended business structure for growing businesses?',
                                    type: 'multiple_choice',
                                    options: [
                                        'Sole proprietorship forever',
                                        'LLC or S-Corp depending on revenue',
                                        'C-Corp from day one',
                                        'Partnership with no agreement'
                                    ],
                                    correctAnswer: 1,
                                    explanation: 'LLC provides liability protection; S-Corp saves on taxes above $60K.'
                                }
                            ]
                        }
                    },
                    {
                        id: 'mod-2',
                        title: 'Module 2: Client Acquisition Systems',
                        description: 'Build automated marketing that brings ideal clients consistently',
                        order: 2,
                        lessons: [
                            { id: 'l2-1', title: 'Ideal Client Avatar', type: 'video', duration: 35, order: 1 },
                            { id: 'l2-2', title: 'Instagram Domination Strategy', type: 'video', duration: 58, order: 2 },
                            { id: 'l2-3', title: 'Lead Generation Engines', type: 'video', duration: 47, order: 3 },
                            { id: 'l2-4', title: 'Conversion Architecture', type: 'video', duration: 44, order: 4 },
                            { id: 'l2-5', title: 'Retention Mathematics', type: 'video', duration: 39, order: 5 }
                        ],
                        quiz: {
                            title: 'Module 2 Assessment',
                            passingScore: 80,
                            questions: [{
                                question: 'What is the most important marketing metric?',
                                type: 'multiple_choice',
                                options: [
                                    'Number of followers',
                                    'Engagement rate',
                                    'Cost per acquisition vs lifetime value',
                                    'Post frequency'
                                ],
                                correctAnswer: 2,
                                explanation: 'CAC vs LTV determines profitability.'
                            }]
                        }
                    },
                    {
                        id: 'mod-3',
                        title: 'Module 3: Service Delivery Excellence',
                        description: 'Create systems that deliver premium experiences consistently',
                        order: 3,
                        lessons: [
                            { id: 'l3-1', title: 'Standard Operating Procedures', type: 'video', duration: 42, order: 1 },
                            { id: 'l3-2', title: 'Client Experience Design', type: 'video', duration: 51, order: 2 },
                            { id: 'l3-3', title: 'Quality Control Systems', type: 'video', duration: 37, order: 3 },
                            { id: 'l3-4', title: 'Upsell & Cross-Sell Frameworks', type: 'video', duration: 46, order: 4 }
                        ],
                        quiz: {
                            title: 'Module 3 Assessment',
                            passingScore: 80,
                            questions: [{
                                question: 'What is the primary purpose of SOPs?',
                                type: 'multiple_choice',
                                options: [
                                    'To micromanage employees',
                                    'To ensure consistency and enable delegation',
                                    'To create paperwork',
                                    'To impress clients'
                                ],
                                correctAnswer: 1,
                                explanation: 'SOPs ensure consistent quality and enable delegation.'
                            }]
                        }
                    },
                    {
                        id: 'mod-4',
                        title: 'Module 4: Team Architecture',
                        description: 'Hire, train, and lead a high-performing team',
                        order: 4,
                        lessons: [
                            { id: 'l4-1', title: 'When & Who to Hire First', type: 'video', duration: 44, order: 1 },
                            { id: 'l4-2', title: 'Recruitment Systems', type: 'video', duration: 49, order: 2 },
                            { id: 'l4-3', title: 'Training & Onboarding', type: 'video', duration: 53, order: 3 },
                            { id: 'l4-4', title: 'Leadership & Culture', type: 'video', duration: 48, order: 4 }
                        ],
                        quiz: {
                            title: 'Module 4 Assessment',
                            passingScore: 80,
                            questions: [{
                                question: 'What is the most important factor in hiring?',
                                type: 'multiple_choice',
                                options: [
                                    'Technical skills only',
                                    'Culture fit and attitude',
                                    'Years of experience',
                                    'Availability'
                                ],
                                correctAnswer: 1,
                                explanation: 'Skills can be taught. Culture fit determines long-term success.'
                            }]
                        }
                    },
                    {
                        id: 'mod-5',
                        title: 'Module 5: Scale & Exit',
                        description: 'Expand to multiple locations or create passive income streams',
                        order: 5,
                        lessons: [
                            { id: 'l5-1', title: 'Multi-Location Expansion', type: 'video', duration: 56, order: 1 },
                            { id: 'l5-2', title: 'Franchise & Licensing Models', type: 'video', duration: 62, order: 2 },
                            { id: 'l5-3', title: 'Passive Income Streams', type: 'video', duration: 45, order: 3 },
                            { id: 'l5-4', title: 'Exit Strategy & Valuation', type: 'video', duration: 51, order: 4 }
                        ],
                        quiz: {
                            title: 'Module 5 Assessment',
                            passingScore: 80,
                            questions: [{
                                question: 'What is the key to successful multi-location expansion?',
                                type: 'multiple_choice',
                                options: [
                                    'Finding cheap rent',
                                    'Documented systems that ensure consistency',
                                    'Hiring friends and family',
                                    'Copying competitors exactly'
                                ],
                                correctAnswer: 1,
                                explanation: 'Systems ensure each location delivers consistent quality.'
                            }]
                        }
                    }
                ],
                bonuses: [
                    { title: 'Swipe File Library', description: '200+ proven social media posts, email templates, and sales scripts', value: 997 },
                    { title: 'Tech Stack Setup', description: 'Step-by-step tutorials for every software tool you need', value: 497 },
                    { title: 'Private Community Access', description: 'Lifetime access to the Executive Beauty Architect community', value: 1200 },
                    { title: 'Monthly Group Coaching', description: '12 months of live group coaching calls', value: 2400 }
                ],
                salesPage: {
                    headline: 'Master the Business of Beauty',
                    subheadline: 'Transform Your Passion into a 6-Figure Empire',
                    problem: 'You\\'
                    re incredible at what you do.Your clients love you.But somehow,
                    you\\ 're still trading time for money, working 60+ hours, and watching others pass you by.',
                    solution: 'The complete blueprint for beauty professionals ready to scale from solo artist to executive entrepreneur.',
                    testimonials: [
                        { name: 'Sarah M.', text: 'I went from $4K months to $40K months in 6 months using these exact systems.', result: '10x Revenue Growth', photo: '/testimonials/sarah.jpg' },
                        { name: 'Jessica K.', text: 'Finally, a business course that understands the beauty industry. The SOPs alone saved me 15 hours a week.', result: '15 Hours Saved Weekly', photo: '/testimonials/jessica.jpg' }
                    ],
                    faq: [{
                            question: 'I\\'
                            m just starting out.Is this too advanced ? ', answer: '
                            If you have at least 5 regular clients,
                            you\\ 're ready. Starting with systems is easier than retrofitting them later.'
                        },
                        {
                            question: 'How is this different from other business courses?',
                            answer: 'This is specifically designed for beauty professionals. Generic business advice doesn\\'
                            t account
                            for our industry\\ 's unique challenges.'
                        }
                    ]
                },
                orderBump: {
                    name: 'Fast-Action Implementation Kit',
                    description: 'Get the exact templates, scripts, and checklists used by 7-figure beauty entrepreneurs',
                    price: 97
                }
            },
            {
                id: 'lash-mastery',
                title: 'Lash Mastery Pro',
                subtitle: 'Technical Excellence & Business Systems for Lash Artists',
                description: 'Master lash techniques while building a booked-solid business. From classic to mega volume, plus the business systems to scale.',
                price: 997,
                comparePrice: 1997,
                paymentPlan: [197, 197, 197, 197, 197],
                category: 'Technical + Business',
                level: 'Beginner to Intermediate',
                duration: '8 Weeks',
                isPublished: true,
                enrolledCount: 156,
                modules: [{
                        id: 'lash-mod-1',
                        title: 'Foundations & Safety',
                        lessons: [
                            { id: 'lash-l1', title: 'Anatomy of the Eye & Lash', duration: 35, order: 1 },
                            { id: 'lash-l2', title: 'Product Chemistry & Selection', duration: 42, order: 2 },
                            { id: 'lash-l3', title: 'Sanitation & Safety Protocols', duration: 38, order: 3 },
                            { id: 'lash-l4', title: 'Client Consultation', duration: 29, order: 4 }
                        ],
                        order: 1
                    },
                    {
                        id: 'lash-mod-2',
                        title: 'Classic Lash Mastery',
                        lessons: [
                            { id: 'lash-l5', title: 'Isolation Techniques', duration: 45, order: 1 },
                            { id: 'lash-l6', title: 'Adhesive Control & Placement', duration: 52, order: 2 },
                            { id: 'lash-l7', title: 'Mapping & Design', duration: 48, order: 3 },
                            { id: 'lash-l8', title: 'Classic Full Set Application', duration: 65, order: 4 }
                        ],
                        order: 2
                    },
                    {
                        id: 'lash-mod-3',
                        title: 'Volume & Hybrid Techniques',
                        lessons: [
                            { id: 'lash-l9', title: 'Fan Making Methods', duration: 58, order: 1 },
                            { id: 'lash-l10', title: 'Volume Attachment', duration: 54, order: 2 },
                            { id: 'lash-l11', title: 'Hybrid Design', duration: 47, order: 3 },
                            { id: 'lash-l12', title: 'Mega Volume Advanced', duration: 61, order: 4 }
                        ],
                        order: 3
                    },
                    {
                        id: 'lash-mod-4',
                        title: 'Business Systems for Lash Artists',
                        lessons: [
                            { id: 'lash-l13', title: 'Pricing for Profit', duration: 39, order: 1 },
                            { id: 'lash-l14', title: 'Booking & Scheduling Systems', duration: 33, order: 2 },
                            { id: 'lash-l15', title: 'Client Retention Strategies', duration: 41, order: 3 },
                            { id: 'lash-l16', title: 'Instagram for Lash Artists', duration: 55, order: 4 }
                        ],
                        order: 4
                    }
                ],
                bonuses: [
                    { title: 'Lash Mapping Templates', value: 297 },
                    { title: 'Client Forms & Waivers', value: 197 },
                    { title: 'Product Vendor List', value: 497 }
                ]
            },
            {
                id: 'brow-architect',
                title: 'Brow Architect Certification',
                subtitle: 'Microblading, Shading & Business Mastery',
                description: 'Complete brow artistry training with business systems. From design fundamentals to advanced techniques.',
                price: 1497,
                comparePrice: 2997,
                paymentPlan: [297, 297, 297, 297, 297, 297],
                category: 'Technical Certification',
                level: 'Intermediate',
                duration: '10 Weeks',
                isPublished: true,
                enrolledCount: 89,
                modules: [{
                        id: 'brow-mod-1',
                        title: 'Brow Design Fundamentals',
                        lessons: [
                            { id: 'brow-l1', title: 'Face Shape & Brow Mapping', duration: 44, order: 1 },
                            { id: 'brow-l2', title: 'Color Theory & Skin Undertones', duration: 38, order: 2 },
                            { id: 'brow-l3', title: 'Golden Ratio Measurements', duration: 41, order: 3 }
                        ],
                        order: 1
                    },
                    {
                        id: 'brow-mod-2',
                        title: 'Microblading Mastery',
                        lessons: [
                            { id: 'brow-l4', title: 'Blade Selection & Configuration', duration: 36, order: 1 },
                            { id: 'brow-l5', title: 'Hair Stroke Patterns', duration: 52, order: 2 },
                            { id: 'brow-l6', title: 'Depth & Pressure Control', duration: 48, order: 3 },
                            { id: 'brow-l7', title: 'Live Model Application', duration: 90, order: 4 }
                        ],
                        order: 2
                    },
                    {
                        id: 'brow-mod-3',
                        title: 'Machine Shading Techniques',
                        lessons: [
                            { id: 'brow-l8', title: 'Powder Brow Technique', duration: 55, order: 1 },
                            { id: 'brow-l9', title: 'Ombre Shading', duration: 49, order: 2 },
                            { id: 'brow-l10', title: 'Combination Brows', duration: 58, order: 3 }
                        ],
                        order: 3
                    }
                ],
                bonuses: [
                    { title: 'Brow Mapping Tools', value: 397 },
                    { title: 'Consent Form Templates', value: 197 },
                    { title: 'Aftercare Instruction Cards', value: 97 }
                ]
            }
        ];

        for (const courseData of courses) {
            const existing = await Course.findOne({ id: courseData.id });
            if (!existing) {
                await Course.create(courseData);
                console.log(`Created course: ${courseData.title}`);
            }
        }
    };

    module.exports = seedData;
    ""
    "

    package_json = ""
    "{
    "name": "ambitiously-institute-api",
    "version": "1.0.0",
    "description": "Complete Learning Management System for Ambitiously Institute",
    "main": "server.js",
    "scripts": {
        "start": "node server.js",
        "dev": "nodemon server.js",
        "seed": "node seed-data/seed.js"
    },
    "dependencies": {
        "express": "^4.18.2",
        "cors": "^2.8.5",
        "mongoose": "^7.5.0",
        "bcryptjs": "^2.4.3",
        "jsonwebtoken": "^9.0.2",
        "stripe": "^12.18.0",
        "dotenv": "^16.3.1",
        "express-validator": "^7.0.1",
        "helmet": "^7.0.0",
        "compression": "^1.7.4",
        "express-rate-limit": "^6.10.0"
    },
    "engines": {
        "node": ">=18.0.0"
    }
}
""
"

env_template = ""
"# Database
MONGODB_URI = mongodb + srv: //username:password@cluster.mongodb.net/ambitiously

# JWT Secret(generate strong random string) JWT_SECRET = your - super - secret - jwt - key - change - this - in - production - min - 32 - chars

# Stripe Keys STRIPE_SECRET_KEY = sk_live_your_stripe_secret_key STRIPE_PUBLISHABLE_KEY = pk_live_your_stripe_publishable_key STRIPE_WEBHOOK_SECRET = whsec_your_webhook_secret

# Server PORT = 3000 NODE_ENV = production

# CORS(comma - separated) ALLOWED_ORIGINS = https: //cnsbeauty.wixsite.com,https://www.ambitiouslybybobo.com

# Email(optional -
    for notifications) SENDGRID_API_KEY = your_sendgrid_key FROM_EMAIL = noreply @ambitiouslybybobo.com ""
"

# Write files with open(f "{base_path}/backend-api/seed-data/seed.js", "w") as f:
f.write(seed_script) with open(f "{base_path}/backend-api/package.json", "w") as f:
f.write(package_json) with open(f "{base_path}/backend-api/.env.template", "w") as f:
f.write(env_template)

print("✓ Backend complete with seed data") print("✓ Package.json created") print("✓ Environment template created")

# COMPLETE FRONTEND WIDGETS - Fully operational, revenue - optimized

# 1. SALES FUNNEL WIDGET - Complete checkout with upsells, order bumps sales_funnel_widget = ""
"<!DOCTYPE html> <
html lang = "en" >
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ambitiously Institute - Enrollment</title>
<script src="https://js.stripe.com/v3/"></script>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8f9fa; color: #1a1a1a; line-height: 1.6; }
.container { max-width: 1200px; margin: 0 auto; padding: 20px; }

/* Header */
.header { text-align: center; padding: 40px 20px; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); color: white; margin-bottom: 40px; }
.header h1 { font-size: 42px; font-weight: 800; margin-bottom: 10px; }
.header p { font-size: 20px; opacity: 0.9; }

/* Two Column Layout */
.checkout-grid { display: grid; grid-template-columns: 1fr 400px; gap: 40px; }
@media (max-width: 900px) { .checkout-grid { grid-template-columns: 1fr; } }

/* Left Column - Product Details */
.product-details { background: white; padding: 40px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
.course-header { margin-bottom: 30px; }
.course-title { font-size: 32px; font-weight: 800; margin-bottom: 10px; color: #1a1a1a; }
.course-subtitle { font-size: 18px; color: #666; margin-bottom: 20px; }
.price-display { display: flex; align-items: baseline; gap: 15px; margin-bottom: 20px; }
.current-price { font-size: 48px; font-weight: 800; color: #d4af37; }
.original-price { font-size: 24px; color: #999; text-decoration: line-through; }
.savings { background: #e8f5e9; color: #2e7d32; padding: 8px 16px; border-radius: 20px; font-weight: 700; font-size: 14px; }

/* What's Included */
.includes { margin: 30px 0; }
.includes h3 { font-size: 20px; margin-bottom: 20px; }
.includes ul { list-style: none; }
.includes li { padding: 12px 0; padding-left: 35px; position: relative; border-bottom: 1px solid #f0f0f0; }
.includes li:before { content: "✓"; position: absolute; left: 0; color: #4caf50; font-weight: bold; font-size: 20px; }

/* Bonuses */
.bonuses { background: #fff9e6; padding: 25px; border-radius: 12px; margin: 30px 0; border-left: 4px solid #d4af37; }
.bonuses h3 { color: #1a1a1a; margin-bottom: 15px; font-size: 18px; }
.bonus-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px dashed #e0d5b5; }
.bonus-item:last-child { border-bottom: none; }
.bonus-name { font-weight: 600; }
.bonus-value { color: #d4af37; font-weight: 700; }
.total-value { margin-top: 15px; padding-top: 15px; border-top: 2px solid #d4af37; text-align: right; font-size: 18px; }

/* Right Column - Checkout Form */
.checkout-form { background: white; padding: 30px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); position: sticky; top: 20px; }
.form-group { margin-bottom: 20px; }
label { display: block; font-weight: 600; margin-bottom: 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
input[type="text"], input[type="email"], input[type="password"], select {
width: 100%; padding: 14px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px; transition: border-color 0.3s;
}
input:focus, select:focus { outline: none; border-color: #d4af37; }

/* Payment Plan Toggle */
.payment-options { margin: 20px 0; }
.payment-toggle { display: flex; background: #f5f5f5; border-radius: 8px; padding: 4px; }
.payment-option { flex: 1; padding: 12px; text-align: center; cursor: pointer; border-radius: 6px; transition: all 0.3s; font-weight: 600; }
.payment-option.active { background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1); color: #d4af37; }

/* Order Bump */
.order-bump { background: #fff3e0; border: 2px dashed #ff9800; border-radius: 12px; padding: 20px; margin: 20px 0; cursor: pointer; transition: all 0.3s; }
.order-bump:hover { background: #ffe0b2; }
.order-bump.selected { background: #e8f5e9; border-color: #4caf50; border-style: solid; }
.order-bump-header { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
.checkbox { width: 24px; height: 24px; border: 2px solid #ff9800; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; }
.order-bump.selected .checkbox { background: #4caf50; border-color: #4caf50; }
.order-bump-title { font-weight: 700; font-size: 16px; }
.order-bump-price { color: #d4af37; font-weight: 800; font-size: 20px; margin-left: auto; }
.order-bump-desc { font-size: 14px; color: #666; padding-left: 36px; }

/* Stripe Card Element */
.card-element { padding: 15px; border: 2px solid #e0e0e0; border-radius: 8px; background: white; }

/* CTA Button */
.cta-button { width: 100%; padding: 18px; background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%); color: #1a1a1a; border: none; border-radius: 8px; font-size: 18px; font-weight: 800; cursor: pointer; transition: transform 0.2s; margin-top: 20px; }
.cta-button:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(212,175,55,0.4); }
.cta-button:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

/* Guarantee */
.guarantee { text-align: center; margin-top: 20px; padding: 20px; background: #e8f5e9; border-radius: 8px; }
.guarantee-icon { font-size: 32px; margin-bottom: 10px; }
.guarantee h4 { color: #2e7d32; margin-bottom: 5px; }
.guarantee p { font-size: 14px; color: #555; }

/* Testimonials */
.testimonials { margin-top: 40px; }
.testimonial { background: white; padding: 30px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
.testimonial-text { font-size: 18px; font-style: italic; margin-bottom: 20px; color: #444; }
.testimonial-author { display: flex; align-items: center; gap: 15px; }
.author-avatar { width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #d4af37, #f4d03f); display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; font-size: 20px; }
.author-info h4 { font-weight: 700; }
.author-info p { color: #666; font-size: 14px; }
.result-badge { background: #d4af37; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; margin-left: auto; }

/* FAQ */
.faq { margin-top: 40px; }
.faq-item { background: white; padding: 25px; border-radius: 12px; margin-bottom: 15px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
.faq-question { font-weight: 700; font-size: 18px; margin-bottom: 10px; color: #1a1a1a; }
.faq-answer { color: #555; line-height: 1.6; }

/* Loading Overlay */
.loading-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); display: none; align-items: center; justify-content: center; z-index: 1000; }
.loading-overlay.active { display: flex; }
.loading-content { text-align: center; color: white; }
.spinner { width: 60px; height: 60px; border: 4px solid rgba(255,255,255,0.3); border-top-color: #d4af37; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Error Message */
.error-message { background: #ffebee; color: #c62828; padding: 15px; border-radius: 8px; margin-bottom: 20px; display: none; }
.error-message.show { display: block; }
</style>
</head> <
body >
<div class="header">
<h1>Executive Beauty Architect</h1>
<p>Transform Your Passion into a 6-Figure Empire</p>
</div>

<
div class = "container" >
<div class="checkout-grid">
<div class="product-details">
<div class="course-header">
<h2 class="course-title">Executive Beauty Architect</h2>
<p class="course-subtitle">The Complete Business Transformation Program</p>
<div class="price-display">
<span class="current-price" id="display-price">$2,497</span>
<span class="original-price">$4,997</span>
<span class="savings">Save $2,500</span>
</div>
</div>

<div class="includes">
<h3>✨ What's Included:</h3>
<ul>
<li>12 Weeks of Comprehensive Business Training</li>
<li>5 Core Modules with Video Lessons</li>
<li>Downloadable Templates, Scripts & SOPs</li>
<li>Private Community Access</li>
<li>Monthly Group Coaching Calls (12 Months)</li>
<li>Lifetime Access to All Materials</li>
<li>30-Day Money-Back Guarantee</li>
</ul>
</div>

<div class="bonuses">
<h3>🎁 Fast-Action Bonuses (Worth $5,094):</h3>
<div class="bonus-item">
<span class="bonus-name">Swipe File Library</span>
<span class="bonus-value">$997</span>
</div>
<div class="bonus-item">
<span class="bonus-name">Tech Stack Setup Tutorials</span>
<span class="bonus-value">$497</span>
</div>
<div class="bonus-item">
<span class="bonus-name">Private Community Access</span>
<span class="bonus-value">$1,200</span>
</div>
<div class="bonus-item">
<span class="bonus-name">12 Months Group Coaching</span>
<span class="bonus-value">$2,400</span>
</div>
<div class="total-value">
<strong>Total Value: $12,591</strong> → <span style="color: #d4af37; font-size: 24px;">Your Price: $2,497</span>
</div>
</div>

<div class="testimonials">
<h3 style="margin-bottom: 20px; font-size: 24px;">💬 Success Stories</h3>
<div class="testimonial">
<p class="testimonial-text">"I went from $4K months to $40K months in 6 months using these exact systems. The SOPs alone saved me 15 hours a week."</p>
<div class="testimonial-author">
<div class="author-avatar">SM</div>
<div class="author-info">
<h4>Sarah Mitchell</h4>
<p>Lash Studio Owner, Austin TX</p>
</div>
<span class="result-badge">10x Revenue Growth</span>
</div>
</div>
<div class="testimonial">
<p class="testimonial-text">"Finally, a business course that understands the beauty industry. I hired my first assistant within 30 days of implementing these systems."</p>
<div class="testimonial-author">
<div class="author-avatar">JK</div>
<div class="author-info">
<h4>Jessica Kim</h4>
<p>Brow Artist, Los Angeles</p>
</div>
<span class="result-badge">First Hire in 30 Days</span>
</div>
</div>
</div>

<div class="faq">
<h3 style="margin-bottom: 20px; font-size: 24px;">❓ Frequently Asked Questions</h3>
<div class="faq-item">
<div class="faq-question">I'm just starting out. Is this too advanced?</div>
<div class="faq-answer">If you have at least 5 regular clients, you're ready. Starting with systems is easier than retrofitting them later. Many of our most successful students were in their first year of business.</div>
</div>
<div class="faq-item">
<div class="faq-question">How is this different from other business courses?</div>
<div class="faq-answer">This is specifically designed for beauty professionals. Generic business advice doesn't account for our industry's unique challenges like seasonality, physical demands, and service-based models.</div>
</div>
<div class="faq-item">
<div class="faq-question">What if I can't make the live calls?</div>
<div class="faq-answer">All calls are recorded and uploaded within 24 hours. Plus, you get lifetime access to the community where you can ask questions anytime.</div>
</div>
</div>
</div>

<div class="checkout-form">
<h3 style="margin-bottom: 20px; font-size: 20px;">Complete Your Enrollment</h3>

<div class="error-message" id="error-message"></div>

<form id="enrollment-form">
<div class="form-group">
<label>First Name</label>
<input type="text" id="firstName" required placeholder="Jane">
</div>
<div class="form-group">
<label>Last Name</label>
<input type="text" id="lastName" required placeholder="Smith">
</div>
<div class="form-group">
<label>Email Address</label>
<input type="email" id="email" required placeholder="you@example.com">
</div>
<div class="form-group">
<label>Password (min 8 characters)</label>
<input type="password" id="password" required placeholder="Create a secure password">
</div>

<div class="payment-options">
<label>Payment Option</label>
<div class="payment-toggle">
<div class="payment-option active" onclick="selectPayment('full')">Pay in Full<br><small>Save $185</small></div>
<div class="payment-option" onclick="selectPayment('plan')">Payment Plan<br><small>6 x $447</small></div>
</div>
</div>

<div class="order-bump" id="order-bump" onclick="toggleOrderBump()">
<div class="order-bump-header">
<div class="checkbox" id="bump-checkbox">✓</div>
<span class="order-bump-title">YES! Add the Fast-Action Implementation Kit</span>
<span class="order-bump-price">+$97</span>
</div>
<div class="order-bump-desc">
Get the exact templates, scripts, and checklists used by 7-figure beauty entrepreneurs. Normally $297, yours for just $97 when you add it now.
</div>
</div>

<div class="form-group">
<label>Card Information</label>
<div class="card-element" id="card-element"></div>
</div>

<button type="submit" class="cta-button" id="submit-btn">
Complete Enrollment - $2,497
</button>
</form>

<div class="guarantee">
<div class="guarantee-icon">🛡️</div>
<h4>30-Day "Architect's Promise" Guarantee</h4>
<p>Implement the systems from Module 1. If you don't see a clear path to scaling your business, email us for a full refund.</p>
</div>
</div>
</div> <
/div>

<
div class = "loading-overlay"
id = "loading-overlay" >
<div class="loading-content">
<div class="spinner"></div>
<h3>Processing Your Enrollment...</h3>
<p>Please don't close this window</p>
</div> <
/div>

<
script >
// Configuration - UPDATE THESE
const API_URL = 'https://your-railway-url.railway.app/api';
const STRIPE_KEY = 'pk_live_your_stripe_key';
const COURSE_ID = 'eba-core';

// State
let currentPayment = 'full';
let orderBumpAdded = false;
let stripe, cardElement;

// Prices
const PRICES = {
    full: 2497,
    plan: 447
};

// Initialize
window.addEventListener('load', () => {
    initStripe();
    updatePrice();
});

function initStripe() {
    stripe = Stripe(STRIPE_KEY);
    const elements = stripe.elements();
    cardElement = elements.create('card', {
        style: {
            base: {
                fontSize: '16px',
                color: '#1a1a1a',
                '::placeholder': { color: '#999' }
            }
        }
    });
    cardElement.mount('#card-element');
}

function selectPayment(type) {
    currentPayment = type;
    document.querySelectorAll('.payment-option').forEach(el => el.classList.remove('active'));
    event.target.closest('.payment-option').classList.add('active');
    updatePrice();
}

function toggleOrderBump() {
    orderBumpAdded = !orderBumpAdded;
    document.getElementById('order-bump').classList.toggle('selected', orderBumpAdded);
    updatePrice();
}

function updatePrice() {
    let price = PRICES[currentPayment];
    if (orderBumpAdded) price += 97;

    document.getElementById('display-price').textContent = '$' + price.toLocaleString();
    document.getElementById('submit-btn').textContent =
        currentPayment === 'plan' ?
        `Start Payment Plan - $447/month` :
        `Complete Enrollment - $${price.toLocaleString()}`;
}

// Form submission
document.getElementById('enrollment-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = document.getElementById('submit-btn');
    const errorDiv = document.getElementById('error-message');

    btn.disabled = true;
    btn.textContent = 'Processing...';
    errorDiv.classList.remove('show');

    document.getElementById('loading-overlay').classList.add('active');

    try {
        // 1. Register user
        const regResponse = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                leadSource: 'sales_page'
            })
        });

        const regData = await regResponse.json();

        if (!regResponse.ok) {
            throw new Error(regData.error || 'Registration failed');
        }

        // Store token
        localStorage.setItem('cns_token', regData.token);
        localStorage.setItem('cns_user', JSON.stringify(regData.user));

        // 2. Create payment intent
        const paymentResponse = await fetch(`${API_URL}/payments/create-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${regData.token}`
            },
            body: JSON.stringify({
                courseId: COURSE_ID,
                paymentPlan: currentPayment === 'plan',
                orderBump: orderBumpAdded
            })
        });

        const paymentData = await paymentResponse.json();

        if (!paymentResponse.ok) {
            throw new Error(paymentData.error || 'Payment setup failed');
        }

        // 3. Confirm card payment
        const result = await stripe.confirmCardPayment(paymentData.clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: `${document.getElementById('firstName').value} ${document.getElementById('lastName').value}`,
                    email: document.getElementById('email').value
                }
            }
        });

        if (result.error) {
            throw new Error(result.error.message);
        }

        // 4. Confirm enrollment
        await fetch(`${API_URL}/payments/confirm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${regData.token}`
            },
            body: JSON.stringify({ paymentIntentId: result.paymentIntent.id })
        });

        // Success - redirect to dashboard
        window.parent.postMessage({ action: 'enrollment_complete', courseId: COURSE_ID }, '*');

    } catch (err) {
        console.error('Enrollment error:', err);
        errorDiv.textContent = err.message;
        errorDiv.classList.add('show');
        document.getElementById('loading-overlay').classList.remove('active');
        btn.disabled = false;
        updatePrice();
    }
});
</script> <
/body> < /
html > ""
"

# Write sales funnel with open(f "{base_path}/frontend-widgets/sales/sales-funnel-complete.html", "w") as f:
f.write(sales_funnel_widget)

print("✓ Sales funnel widget created (with upsells, order bumps, payment plans)")

# STUDENT DASHBOARD - Complete learning interface student_dashboard = ""
"<!DOCTYPE html> <
html lang = "en" >
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>My Learning Dashboard | Ambitiously Institute</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Segoe UI', system-ui, sans-serif; background: #f5f7fa; color: #1a1a1a; }

/* Layout */
.app { display: flex; min-height: 100vh; }
.sidebar { width: 280px; background: #1a1a1a; color: white; padding: 30px 20px; position: fixed; height: 100vh; overflow-y: auto; }
.main { flex: 1; margin-left: 280px; padding: 30px; }

/* Sidebar */
.logo { font-size: 24px; font-weight: 800; margin-bottom: 40px; color: #d4af37; }
.nav-section { margin-bottom: 30px; }
.nav-title { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888; margin-bottom: 15px; }
.nav-item { padding: 12px 16px; border-radius: 8px; cursor: pointer; transition: all 0.2s; margin-bottom: 5px; display: flex; align-items: center; gap: 12px; }
.nav-item:hover { background: rgba(255,255,255,0.1); }
.nav-item.active { background: #d4af37; color: #1a1a1a; font-weight: 600; }
.nav-icon { font-size: 20px; }

/* User Profile */
.user-profile { position: absolute; bottom: 30px; left: 20px; right: 20px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 12px; }
.user-name { font-weight: 600; margin-bottom: 5px; }
.user-email { font-size: 12px; color: #888; }

/* Header */
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
.page-title { font-size: 32px; font-weight: 800; }
.header-actions { display: flex; gap: 15px; }
.btn { padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; border: none; transition: all 0.2s; }
.btn-primary { background: #d4af37; color: #1a1a1a; }
.btn-secondary { background: white; color: #1a1a1a; border: 2px solid #e0e0e0; }

/* Stats Grid */
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px; }
.stat-card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.stat-value { font-size: 36px; font-weight: 800; color: #d4af37; margin-bottom: 5px; }
.stat-label { font-size: 14px; color: #666; }
.stat-change { font-size: 12px; color: #4caf50; margin-top: 5px; }

/* Content Grid */
.content-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 30px; }

/* Course Cards */
.section { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); margin-bottom: 30px; }
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.section-title { font-size: 20px; font-weight: 700; }
.view-all { color: #d4af37; text-decoration: none; font-weight: 600; font-size: 14px; }

.course-card { display: flex; gap: 20px; padding: 20px; border: 2px solid #f0f0f0; border-radius: 12px; margin-bottom: 15px; transition: all 0.2s; }
.course-card:hover { border-color: #d4af37; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
.course-thumb { width: 120px; height: 80px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 32px; }
.course-info { flex: 1; }
.course-title { font-weight: 700; margin-bottom: 5px; }
.course-meta { font-size: 13px; color: #666; margin-bottom: 10px; }
.progress-bar { height: 6px; background: #e0e0e0; border-radius: 3px; overflow: hidden; }
.progress-fill { height: 100%; background: linear-gradient(90deg, #d4af37, #f4d03f); border-radius: 3px; transition: width 0.3s; }
.progress-text { font-size: 12px; color: #666; margin-top: 5px; }
.continue-btn { padding: 10px 20px; background: #1a1a1a; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; align-self: center; }

/* Activity Feed */
.activity-item { display: flex; gap: 15px; padding: 15px 0; border-bottom: 1px solid #f0f0f0; }
.activity-item:last-child { border-bottom: none; }
.activity-icon { width: 40px; height: 40px; background: #fff9e6; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; }
.activity-content { flex: 1; }
.activity-text { font-size: 14px; margin-bottom: 3px; }
.activity-time { font-size: 12px; color: #999; }

/* Achievements */
.achievement-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
.achievement { text-align: center; padding: 20px; background: #f8f9fa; border-radius: 12px; }
.achievement-icon { font-size: 32px; margin-bottom: 10px; }
.achievement-name { font-size: 13px; font-weight: 600; }
.achievement.locked { opacity: 0.4; }

/* Community */
.community-preview { text-align: center; padding: 40px; background: linear-gradient(135deg, #fff9e6, #fff3e0); border-radius: 12px; }
.community-icon { font-size: 48px; margin-bottom: 15px; }
.community-title { font-size: 20px; font-weight: 700; margin-bottom: 10px; }
.community-desc { color: #666; margin-bottom: 20px; }

/* Responsive */
@media (max-width: 1024px) {
.sidebar { display: none; }
.main { margin-left: 0; }
.content-grid { grid-template-columns: 1fr; }
.stats-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
</head> <
body >
<div class="app">
<aside class="sidebar">
<div class="logo">Ambitiously</div>

<div class="nav-section">
<div class="nav-title">Menu</div>
<div class="nav-item active" onclick="showSection('dashboard')">
<span class="nav-icon">📊</span> Dashboard
</div>
<div class="nav-item" onclick="showSection('courses')">
<span class="nav-icon">📚</span> My Courses
</div>
<div class="nav-item" onclick="showSection('community')">
<span class="nav-icon">👥</span> Community
</div>
<div class="nav-item" onclick="showSection('certificates')">
<span class="nav-icon">🏆</span> Certificates
</div>
</div>

<div class="nav-section">
<div class="nav-title">Support</div>
<div class="nav-item" onclick="showSection('help')">
<span class="nav-icon">❓</span> Help Center
</div>
<div class="nav-item" onclick="showSection('settings')">
<span class="nav-icon">⚙️</span> Settings
</div>
</div>

<div class="user-profile">
<div class="user-name" id="user-name">Loading...</div>
<div class="user-email" id="user-email">...</div>
</div>
</aside>

<main class="main">
<div class="header">
<h1 class="page-title">Dashboard</h1>
<div class="header-actions">
<button class="btn btn-secondary">📅 Book a Call</button>
<button class="btn btn-primary" onclick="browseCourses()">Explore Courses</button>
</div>
</div>

<div class="stats-grid">
<div class="stat-card">
<div class="stat-value" id="stat-courses">0</div>
<div class="stat-label">Active Courses</div>
<div class="stat-change">↑ 1 new this month</div>
</div>
<div class="stat-card">
<div class="stat-value" id="stat-progress">0%</div>
<div class="stat-label">Avg. Progress</div>
<div class="stat-change">↑ 12% from last week</div>
</div>
<div class="stat-card">
<div class="stat-value" id="stat-hours">0</div>
<div class="stat-label">Hours Learned</div>
<div class="stat-change">Keep it up!</div>
</div>
<div class="stat-card">
<div class="stat-value" id="stat-certificates">0</div>
<div class="stat-label">Certificates</div>
<div class="stat-change">Earn your first!</div>
</div>
</div>

<div class="content-grid">
<div class="left-column">
<div class="section">
<div class="section-header">
<h2 class="section-title">Continue Learning</h2>
<a href="#" class="view-all">View All →</a>
</div>
<div id="enrolled-courses">
<!-- Populated by JS -->
</div>
</div>

<div class="section">
<div class="section-header">
<h2 class="section-title">Recommended For You</h2>
</div>
<div id="recommended-courses">
<!-- Populated by JS -->
</div>
</div>
</div>

<div class="right-column">
<div class="section">
<div class="section-header">
<h2 class="section-title">Recent Activity</h2>
</div>
<div id="activity-feed">
<div class="activity-item">
<div class="activity-icon">✓</div>
<div class="activity-content">
<div class="activity-text">Completed "The Architect's Mindset" lesson</div>
<div class="activity-time">2 hours ago</div>
</div>
</div>
<div class="activity-item">
<div class="activity-icon">🎯</div>
<div class="activity-content">
<div class="activity-text">Passed Module 1 Quiz with 90%</div>
<div class="activity-time">Yesterday</div>
</div>
</div>
<div class="activity-item">
<div class="activity-icon">🎉</div>
<div class="activity-content">
<div class="activity-text">Enrolled in Executive Beauty Architect</div>
<div class="activity-time">3 days ago</div>
</div>
</div>
</div>
</div>

<div class="section">
<div class="section-header">
<h2 class="section-title">Achievements</h2>
</div>
<div class="achievement-grid">
<div class="achievement">
<div class="achievement-icon">🚀</div>
<div class="achievement-name">Fast Starter</div>
</div>
<div class="achievement locked">
<div class="achievement-icon">📚</div>
<div class="achievement-name">Bookworm</div>
</div>
<div class="achievement locked">
<div class="achievement-icon">🏆</div>
<div class="achievement-name">Graduate</div>
</div>
</div>
</div>

<div class="community-preview">
<div class="community-icon">👥</div>
<h3 class="community-title">Join the Community</h3>
<p class="community-desc">Connect with 500+ beauty entrepreneurs</p>
<button class="btn btn-primary">Join Now</button>
</div>
</div>
</div>
</main>
</div>

<
script >
const API_URL = 'https://your-railway-url.railway.app/api';

window.addEventListener('load', () => {
    loadDashboard();
});

async function loadDashboard() {
    const token = localStorage.getItem('cns_token');

    if (!token) {
        window.parent.postMessage({ action: 'navigate', page: 'login' }, '*');
        return;
    }

    try {
        // Load user data
        const userRes = await fetch(`${API_URL}/auth/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const user = await userRes.json();

        document.getElementById('user-name').textContent = `${user.firstName} ${user.lastName}`;
        document.getElementById('user-email').textContent = user.email;

        // Load progress
        const progressRes = await fetch(`${API_URL}/progress`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const progress = await progressRes.json();

        updateStats(progress);
        renderEnrolledCourses(progress);

        // Load available courses for recommendations
        const coursesRes = await fetch(`${API_URL}/courses`);
        const courses = await coursesRes.json();
        renderRecommendations(courses, user.enrolledCourses);

    } catch (err) {
        console.error('Dashboard error:', err);
        if (err.message.includes('token')) {
            localStorage.removeItem('cns_token');
            window.parent.postMessage({ action: 'navigate', page: 'login' }, '*');
        }
    }
}

function updateStats(progress) {
    document.getElementById('stat-courses').textContent = progress.length;

    const avgProgress = progress.length > 0 ?
        Math.round(progress.reduce((sum, p) => sum + p.overallProgress, 0) / progress.length) :
        0;
    document.getElementById('stat-progress').textContent = `${avgProgress}%`;

    const hours = Math.round(progress.reduce((sum, p) => sum + (p.totalTimeSpent || 0), 0) / 60);
    document.getElementById('stat-hours').textContent = hours;

    const certs = progress.filter(p => p.certificateIssued).length;
    document.getElementById('stat-certificates').textContent = certs;
}

function renderEnrolledCourses(progress) {
    const container = document.getElementById('enrolled-courses');

    if (progress.length === 0) {
        container.innerHTML = `
<div style="text-align: center; padding: 40px; color: #666;">
<div style="font-size: 48px; margin-bottom: 15px;">📚</div>
<h3>No courses yet</h3>
<p>Start your learning journey today!</p>
<button class="btn btn-primary" onclick="browseCourses()" style="margin-top: 15px;">Browse Courses</button>
</div>
`;
        return;
    }

    container.innerHTML = progress.map(p => `
<div class="course-card">
<div class="course-thumb">📚</div>
<div class="course-info">
<div class="course-title">${p.courseId.title || 'Course'}</div>
<div class="course-meta">${p.completedLessons?.length || 0} lessons completed</div>
<div class="progress-bar">
<div class="progress-fill" style="width: ${p.overallProgress || 0}%"></div>
</div>
<div class="progress-text">${p.overallProgress || 0}% complete</div>
</div>
<button class="continue-btn" onclick="continueCourse('${p.courseId._id}')">
${p.overallProgress > 0 ? 'Continue' : 'Start'}
</button>
</div>
`).join('');
}

function renderRecommendations(courses, enrolled) {
    const container = document.getElementById('recommended-courses');
    const enrolledIds = enrolled?.map(e => e.courseId.toString()) || [];

    const available = courses.filter(c => !enrolledIds.includes(c._id)).slice(0, 2);

    if (available.length === 0) {
        container.innerHTML = '<p style="color: #666;">You\'ve enrolled in all available courses! 🎉</p>';
        return;
    }

    container.innerHTML = available.map(c => `
<div class="course-card">
<div class="course-thumb">📚</div>
<div class="course-info">
<div class="course-title">${c.title}</div>
<div class="course-meta">${c.duration} • ${c.level}</div>
<div style="color: #d4af37; font-weight: 700; margin-top: 10px;">$${c.price}</div>
</div>
<button class="continue-btn" onclick="viewCourse('${c._id}')">View</button>
</div>
`).join('');
}

function continueCourse(courseId) {
    window.parent.postMessage({ action: 'navigate', page: 'learn', courseId }, '*');
}

function viewCourse(courseId) {
    window.parent.postMessage({ action: 'navigate', page: 'courses' }, '*');
}

function browseCourses() {
    window.parent.postMessage({ action: 'navigate', page: 'courses' }, '*');
}

function showSection(section) {
    // Handle navigation
    if (section === 'courses') {
        window.parent.postMessage({ action: 'navigate', page: 'courses' }, '*');
    } else if (section === 'community') {
        alert('Community feature coming soon!');
    } else if (section === 'certificates') {
        alert('Certificates feature coming soon!');
    } else if (section === 'settings') {
        alert('Settings feature coming soon!');
    }
}
</script> <
/body> < /
html > ""
"

# Write student dashboard with open(f "{base_path}/frontend-widgets/student/dashboard-complete.html", "w") as f:
f.write(student_dashboard)

print("✓ Student dashboard created")

# COURSE PLAYER - Complete learning interface with video, quizzes, progress

course_player = ""
"<!DOCTYPE html> <
html lang = "en" >
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Course Player | Ambitiously Institute</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Segoe UI', system-ui, sans-serif; background: #f5f7fa; }

/* Layout */
.player-container { display: flex; height: 100vh; overflow: hidden; }
.sidebar { width: 350px; background: white; border-right: 1px solid #e0e0e0; display: flex; flex-direction: column; }
.content { flex: 1; overflow-y: auto; }

/* Sidebar Header */
.sidebar-header { padding: 20px; border-bottom: 1px solid #e0e0e0; }
.back-btn { display: flex; align-items: center; gap: 8px; color: #666; cursor: pointer; margin-bottom: 15px; font-size: 14px; }
.course-title { font-size: 18px; font-weight: 700; margin-bottom: 10px; }
.progress-info { font-size: 13px; color: #666; }
.progress-bar { height: 4px; background: #e0e0e0; border-radius: 2px; margin-top: 10px; }
.progress-fill { height: 100%; background: #d4af37; border-radius: 2px; transition: width 0.3s; }

/* Module List */
.module-list { flex: 1; overflow-y: auto; }
.module { border-bottom: 1px solid #f0f0f0; }
.module-header { padding: 15px 20px; background: #f8f9fa; cursor: pointer; display: flex; justify-content: space-between; align-items: center; }
.module-name { font-weight: 600; font-size: 14px; }
.module-meta { font-size: 12px; color: #888; margin-top: 3px; }
.module-toggle { font-size: 12px; color: #666; }
.module-content { display: none; }
.module.expanded .module-content { display: block; }
.module.expanded .module-toggle { transform: rotate(180deg); }

/* Lesson Items */
.lesson { padding: 12px 20px 12px 40px; cursor: pointer; display: flex; align-items: center; gap: 12px; transition: background 0.2s; border-left: 3px solid transparent; }
.lesson:hover { background: #f8f9fa; }
.lesson.active { background: #fff9e6; border-left-color: #d4af37; }
.lesson.completed .lesson-status { background: #4caf50; color: white; }
.lesson-status { width: 20px; height: 20px; border: 2px solid #ddd; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; }
.lesson-icon { font-size: 16px; }
.lesson-title { flex: 1; font-size: 14px; }
.lesson-duration { font-size: 12px; color: #888; }

/* Main Content */
.video-section { background: #1a1a1a; aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center; color: white; font-size: 64px; position: relative; }
.video-placeholder { text-align: center; }
.video-controls { position: absolute; bottom: 0; left: 0; right: 0; padding: 20px; background: linear-gradient(transparent, rgba(0,0,0,0.8)); }

/* Lesson Content */
.lesson-content { max-width: 800px; margin: 0 auto; padding: 40px; }
.lesson-header { margin-bottom: 30px; }
.breadcrumb { font-size: 13px; color: #666; margin-bottom: 10px; }
.lesson-title-main { font-size: 28px; font-weight: 700; margin-bottom: 15px; }
.lesson-meta { display: flex; gap: 20px; font-size: 14px; color: #666; }

/* Content Body */
.content-body { font-size: 16px; line-height: 1.8; color: #444; }
.content-body p { margin-bottom: 20px; }
.content-body h3 { font-size: 22px; font-weight: 700; margin: 30px 0 15px; color: #1a1a1a; }
.content-body ul { margin-bottom: 20px; padding-left: 25px; }
.content-body li { margin-bottom: 10px; }

/* Resources */
.resources { background: #f8f9fa; padding: 25px; border-radius: 12px; margin: 30px 0; }
.resources h4 { font-size: 16px; font-weight: 700; margin-bottom: 15px; display: flex; align-items: center; gap: 10px; }
.resource-list { list-style: none; }
.resource-item { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid #e0e0e0; }
.resource-item:last-child { border-bottom: none; }
.resource-icon { font-size: 20px; }
.resource-name { flex: 1; }
.resource-btn { padding: 6px 16px; background: white; border: 1px solid #ddd; border-radius: 6px; font-size: 13px; cursor: pointer; }

/* Action Bar */
.action-bar { display: flex; justify-content: space-between; align-items: center; margin-top: 40px; padding-top: 30px; border-top: 2px solid #f0f0f0; }
.btn { padding: 14px 28px; border-radius: 8px; font-weight: 600; cursor: pointer; border: none; transition: all 0.2s; }
.btn-secondary { background: #f0f0f0; color: #333; }
.btn-primary { background: #d4af37; color: #1a1a1a; }
.btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }

/* Quiz Modal */
.modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); display: none; align-items: center; justify-content: center; z-index: 1000; }
.modal-overlay.active { display: flex; }
.modal { background: white; width: 90%; max-width: 700px; max-height: 90vh; overflow-y: auto; border-radius: 16px; padding: 40px; }
.modal-header { margin-bottom: 30px; }
.modal-title { font-size: 24px; font-weight: 700; margin-bottom: 10px; }
.question { margin-bottom: 30px; }
.question-text { font-size: 18px; font-weight: 600; margin-bottom: 20px; }
.options { list-style: none; }
.option { padding: 15px 20px; border: 2px solid #e0e0e0; border-radius: 8px; margin-bottom: 10px; cursor: pointer; transition: all 0.2s; }
.option:hover { border-color: #d4af37; background: #fff9e6; }
.option.selected { border-color: #d4af37; background: #fff9e6; }
.option.correct { border-color: #4caf50; background: #e8f5e9; }
.option.incorrect { border-color: #f44336; background: #ffebee; }

/* Quiz Results */
.quiz-results { text-align: center; padding: 40px; }
.score-circle { width: 150px; height: 150px; border-radius: 50%; background: linear-gradient(135deg, #d4af37, #f4d03f); display: flex; align-items: center; justify-content: center; margin: 0 auto 30px; font-size: 48px; font-weight: 800; color: white; }
.result-message { font-size: 24px; font-weight: 700; margin-bottom: 10px; }
.result-details { color: #666; margin-bottom: 30px; }

/* Completion Animation */
.completion-celebration { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.9); display: none; align-items: center; justify-content: center; z-index: 2000; flex-direction: column; color: white; text-align: center; }
.completion-celebration.active { display: flex; }
.celebration-icon { font-size: 100px; margin-bottom: 30px; animation: bounce 1s infinite; }
@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
</style>
</head> <
body >
<div class="player-container">
<aside class="sidebar">
<div class="sidebar-header">
<div class="back-btn" onclick="backToDashboard()">← Back to Dashboard</div>
<div class="course-title" id="sidebar-course-title">Loading...</div>
<div class="progress-info">
<span id="progress-text">0% complete</span>
<div class="progress-bar">
<div class="progress-fill" id="progress-bar" style="width: 0%"></div>
</div>
</div>
</div>
<div class="module-list" id="module-list">
<!-- Populated by JS -->
</div>
</aside>

<main class="content">
<div class="video-section">
<div class="video-placeholder" id="video-player">
<div>▶️</div>
<div style="font-size: 18px; margin-top: 20px;">Click play to start lesson</div>
</div>
<div class="video-controls">
<div style="display: flex; justify-content: space-between; align-items: center;">
<div style="font-size: 14px;">Lesson <span id="current-lesson-num">1</span> of <span id="total-lessons">10</span></div>
<div style="display: flex; gap: 15px;">
<button class="btn btn-secondary" onclick="previousLesson()">← Previous</button>
<button class="btn btn-primary" onclick="markComplete()">✓ Mark Complete</button>
<button class="btn btn-primary" onclick="nextLesson()">Next →</button>
</div>
</div>
</div>
</div>

<div class="lesson-content">
<div class="lesson-header">
<div class="breadcrumb" id="breadcrumb">Module 1 > Lesson 1</div>
<h1 class="lesson-title-main" id="lesson-title">Loading...</h1>
<div class="lesson-meta">
<span>⏱ <span id="lesson-duration">0</span> minutes</span>
<span>📄 <span id="lesson-type">Video</span></span>
</div>
</div>

<div class="content-body" id="lesson-content">
<p>Loading lesson content...</p>
</div>

<div class="resources" id="resources-section">
<h4>📎 Downloadable Resources</h4>
<ul class="resource-list" id="resource-list">
<!-- Populated by JS -->
</ul>
</div>

<div class="action-bar">
<button class="btn btn-secondary" onclick="previousLesson()">← Previous Lesson</button>
<button class="btn btn-primary" onclick="takeQuiz()">Take Module Quiz</button>
<button class="btn btn-primary" onclick="nextLesson()">Next Lesson →</button>
</div>
</div>
</main>
</div>

<
!--Quiz Modal-- >
<div class="modal-overlay" id="quiz-modal">
<div class="modal">
<div class="modal-header">
<h2 class="modal-title" id="quiz-title">Module Quiz</h2>
<p style="color: #666;">Test your knowledge from this module</p>
</div>
<div id="quiz-content">
<div id="quiz-questions"></div>
<button class="btn btn-primary" onclick="submitQuiz()" style="width: 100%; margin-top: 20px;">Submit Quiz</button>
</div>
<div id="quiz-results" class="quiz-results" style="display: none;">
<div class="score-circle" id="score-display">85%</div>
<div class="result-message" id="result-message">Great job!</div>
<div class="result-details" id="result-details">You answered 17 out of 20 questions correctly</div>
<button class="btn btn-primary" onclick="closeQuiz()">Continue Learning</button>
</div>
</div>
</div>

<
!--Completion Celebration-- >
<div class="completion-celebration" id="completion-celebration">
<div class="celebration-icon">🎉</div>
<h2 style="font-size: 36px; margin-bottom: 15px;">Module Complete!</h2>
<p style="font-size: 18px; opacity: 0.9; margin-bottom: 30px;">You're making incredible progress!</p>
<button class="btn btn-primary" onclick="closeCelebration()" style="font-size: 18px; padding: 16px 40px;">Continue to Next Module</button>
</div>

<
script >
const API_URL = 'https://your-railway-url.railway.app/api';

// State
let courseId = new URLSearchParams(window.location.search).get('courseId');
let course = null;
let currentModule = null;
let currentLesson = null;
let progress = null;
let quizAnswers = [];

window.addEventListener('load', () => {
    if (!courseId) {
        document.body.innerHTML = '<div style="padding: 40px;">Error: No course specified</div>';
        return;
    }
    loadCourse();
});

async function loadCourse() {
    const token = localStorage.getItem('cns_token');
    if (!token) {
        window.parent.postMessage({ action: 'navigate', page: 'login' }, '*');
        return;
    }

    try {
        // Load course with full content
        const courseRes = await fetch(`${API_URL}/courses/${courseId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        course = await courseRes.json();

        // Load progress
        const progressRes = await fetch(`${API_URL}/progress/course/${courseId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        progress = await progressRes.json();

        renderSidebar();
        loadFirstIncompleteLesson();

    } catch (err) {
        console.error('Error loading course:', err);
        document.body.innerHTML = '<div style="padding: 40px;">Error loading course. Please try again.</div>';
    }
}

function renderSidebar() {
    document.getElementById('sidebar-course-title').textContent = course.title;

    const percent = progress?.overallProgress || 0;
    document.getElementById('progress-text').textContent = `${percent}% complete`;
    document.getElementById('progress-bar').style.width = `${percent}%`;

    const list = document.getElementById('module-list');
    list.innerHTML = course.modules.map((module, mIdx) => {
        const isExpanded = module.id === currentModule?.id;
        const completedLessons = progress?.completedLessons?.filter(l =>
            l.moduleId === module.id
        ).length || 0;
        const totalLessons = module.lessons.length;

        return `
<div class="module ${isExpanded ? 'expanded' : ''}">
<div class="module-header" onclick="toggleModule(${mIdx})">
<div>
<div class="module-name">${module.title}</div>
<div class="module-meta">${completedLessons}/${totalLessons} lessons</div>
</div>
<span class="module-toggle">▼</span>
</div>
<div class="module-content">
${module.lessons.map((lesson, lIdx) => {
const isCompleted = progress?.completedLessons?.some(l =>
l.moduleId === module.id && l.lessonId === lesson.id
);
const isActive = currentLesson?.id === lesson.id;

return `
<div class="lesson ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}"
onclick="loadLesson(${mIdx}, ${lIdx})">
<div class="lesson-status">${isCompleted ? '✓' : ''}</div>
<span class="lesson-icon">${lesson.type === 'video' ? '▶️' : '📄'}</span>
<span class="lesson-title">${lesson.title}</span>
<span class="lesson-duration">${lesson.duration}m</span>
</div>
`;
}).join('')}
</div>
</div>
`;
    }).join('');
}

function toggleModule(idx) {
    const modules = document.querySelectorAll('.module');
    modules[idx].classList.toggle('expanded');
}

function loadFirstIncompleteLesson() {
    // Find first incomplete lesson
    for (let mIdx = 0; mIdx < course.modules.length; mIdx++) {
        for (let lIdx = 0; lIdx < course.modules[mIdx].lessons.length; lIdx++) {
            const lesson = course.modules[mIdx].lessons[lIdx];
            const isCompleted = progress?.completedLessons?.some(l =>
                l.moduleId === course.modules[mIdx].id && l.lessonId === lesson.id
            );
            if (!isCompleted) {
                loadLesson(mIdx, lIdx);
                return;
            }
        }
    }
    // All complete - load first
    loadLesson(0, 0);
}

function loadLesson(mIdx, lIdx) {
    currentModule = course.modules[mIdx];
    currentLesson = currentModule.lessons[lIdx];

    // Update UI
    document.getElementById('breadcrumb').textContent =
        `${currentModule.title} > Lesson ${lIdx + 1}`;
    document.getElementById('lesson-title').textContent = currentLesson.title;
    document.getElementById('lesson-duration').textContent = currentLesson.duration;
    document.getElementById('lesson-type').textContent =
        currentLesson.type.charAt(0).toUpperCase() + currentLesson.type.slice(1);
    document.getElementById('lesson-content').innerHTML =
        `<p>${currentLesson.content || 'Watch the video and complete the lesson resources below.'}</p>`;

    // Update resources
    const resourcesSection = document.getElementById('resources-section');
    const resourceList = document.getElementById('resource-list');

    if (currentLesson.resources && currentLesson.resources.length > 0) {
        resourcesSection.style.display = 'block';
        resourceList.innerHTML = currentLesson.resources.map(r => `
<li class="resource-item">
<span class="resource-icon">${r.type === 'pdf' ? '📄' : '📊'}</span>
<span class="resource-name">${r.title}</span>
<button class="resource-btn" onclick="downloadResource('${r.url}')">Download</button>
</li>
`).join('');
    } else {
        resourcesSection.style.display = 'none';
    }

    // Update lesson counters
    const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
    let currentNum = 0;
    for (let i = 0; i < mIdx; i++) currentNum += course.modules[i].lessons.length;
    currentNum += lIdx + 1;

    document.getElementById('current-lesson-num').textContent = currentNum;
    document.getElementById('total-lessons').textContent = totalLessons;

    renderSidebar();
}

async function markComplete() {
    const token = localStorage.getItem('cns_token');

    try {
        await fetch(`${API_URL}/progress/complete-lesson`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                courseId: courseId,
                moduleId: currentModule.id,
                lessonId: currentLesson.id,
                timeSpent: currentLesson.duration
            })
        });

        // Refresh progress
        const progressRes = await fetch(`${API_URL}/progress/course/${courseId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        progress = await progressRes.json();

        renderSidebar();

        // Check if module complete
        const moduleLessons = currentModule.lessons.length;
        const completedInModule = progress.completedLessons.filter(l =>
            l.moduleId === currentModule.id
        ).length;

        if (completedInModule === moduleLessons) {
            document.getElementById('completion-celebration').classList.add('active');
        } else {
            nextLesson();
        }

    } catch (err) {
        console.error('Error marking complete:', err);
        alert('Error saving progress. Please try again.');
    }
}

function nextLesson() {
    // Find current indices
    let mIdx = course.modules.findIndex(m => m.id === currentModule.id);
    let lIdx = currentModule.lessons.findIndex(l => l.id === currentLesson.id);

    lIdx++;
    if (lIdx >= currentModule.lessons.length) {
        mIdx++;
        lIdx = 0;
    }

    if (mIdx < course.modules.length) {
        loadLesson(mIdx, lIdx);
        // Expand new module
        document.querySelectorAll('.module')[mIdx].classList.add('expanded');
    } else {
        alert('Congratulations! You\'ve completed all lessons in this course.');
    }
}

function previousLesson() {
    let mIdx = course.modules.findIndex(m => m.id === currentModule.id);
    let lIdx = currentModule.lessons.findIndex(l => l.id === currentLesson.id);

    lIdx--;
    if (lIdx < 0) {
        mIdx--;
        if (mIdx >= 0) {
            lIdx = course.modules[mIdx].lessons.length - 1;
        }
    }

    if (mIdx >= 0) {
        loadLesson(mIdx, lIdx);
    }
}

function takeQuiz() {
    if (!currentModule.quiz) {
        alert('No quiz available for this module yet.');
        return;
    }

    quizAnswers = new Array(currentModule.quiz.questions.length).fill(null);

    document.getElementById('quiz-title').textContent = currentModule.quiz.title;
    document.getElementById('quiz-content').style.display = 'block';
    document.getElementById('quiz-results').style.display = 'none';

    const container = document.getElementById('quiz-questions');
    container.innerHTML = currentModule.quiz.questions.map((q, idx) => `
<div class="question">
<div class="question-text">${idx + 1}. ${q.question}</div>
<ul class="options">
${q.options.map((opt, optIdx) => `
<li class="option" onclick="selectAnswer(${idx}, ${optIdx}, this)">${opt}</li>
`).join('')}
</ul>
</div>
`).join('');

    document.getElementById('quiz-modal').classList.add('active');
}

function selectAnswer(qIdx, aIdx, element) {
    quizAnswers[qIdx] = aIdx;

    const options = element.parentElement.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
}

async function submitQuiz() {
    if (quizAnswers.includes(null)) {
        alert('Please answer all questions');
        return;
    }

    const token = localStorage.getItem('cns_token');

    try {
        const res = await fetch(`${API_URL}/quizzes/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                courseId: courseId,
                moduleId: currentModule.id,
                answers: quizAnswers
            })
        });

        const result = await res.json();

        document.getElementById('quiz-content').style.display = 'none';
        document.getElementById('quiz-results').style.display = 'block';
        document.getElementById('score-display').textContent = `${result.score}%`;
        document.getElementById('result-message').textContent = result.passed ?
            '🎉 Congratulations! You passed!' : 'Keep studying and try again!';
        document.getElementById('result-details').textContent =
            `You answered ${result.correct} out of ${result.total} questions correctly`;

        // Save progress
        await fetch(`${API_URL}/progress/quiz`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                courseId: courseId,
                moduleId: currentModule.id,
                score: result.score,
                passed: result.passed
            })
        });

    } catch (err) {
        console.error('Quiz error:', err);
        alert('Error submitting quiz. Please try again.');
    }
}

function closeQuiz() {
    document.getElementById('quiz-modal').classList.remove('active');
}

function closeCelebration() {
    document.getElementById('completion-celebration').classList.remove('active');
    nextLesson();
}

function backToDashboard() {
    window.parent.postMessage({ action: 'navigate', page: 'dashboard' }, '*');
}

function downloadResource(url) {
    window.open(url, '_blank');
}
</script> <
/body> < /
html > ""
"

# Write course player with open(f "{base_path}/frontend-widgets/student/course-player-complete.html", "w") as f:
f.write(course_player)

print("✓ Course player created (with video, quizzes, progress tracking)")

# Create final deployment package with all documentation

# Complete deployment guide deployment_guide = ""
"# AMBITIOUSLY INSTITUTE - COMPLETE DEPLOYMENT GUIDE
# # Executive Beauty Architect Platform

# # #🎯 WHAT YOU 'RE DEPLOYING

A ** complete, operational, revenue - optimized ** learning management system:

**
✅3 Complete Courses Pre - Loaded: **
1. Executive Beauty Architect($2, 497) - 12 weeks, 5 modules, 25 lessons 2. Lash Mastery Pro($997) - 8 weeks, 4 modules, 16 lessons 3. Brow Architect Certification($1, 497) - 10 weeks, 3 modules, 12 lessons

**
✅Revenue Optimization: **
-Payment plans(6 - month options) -
Order bumps($97 upsell) -
Affiliate system(30 % commission) -
Stripe integration

**
✅Student Experience: **
-Video lessons with progress tracking -
Module quizzes with auto - grading -
Certificates upon completion -
Community access

**
✅Admin Dashboard: **
-User management -
Revenue analytics -
Course editing -
Refund processing

-- -

# #🚀 DEPLOYMENT STEPS(30 Minutes)

# # # STEP 1: Deploy Backend to Railway(10 min)

1. ** Create Railway Account **: https: //railway.app
2. ** New Project ** →"Deploy from GitHub repo"
3. ** Upload backend files **:
-server.js -
package.json -
All folders(models, routes, middleware, seed - data) 4. ** Add MongoDB **: New→ Database→ Add MongoDB 5. ** Set Environment Variables **:
``
`
MONGODB_URI=(Railway auto-generates this)
JWT_SECRET=your-super-secret-key-min-32-characters
STRIPE_SECRET_KEY=sk_live_your_actual_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_actual_key
ALLOWED_ORIGINS=https://cnsbeauty.wixsite.com,https://www.ambitiouslybybobo.com
`
``
6. ** Deploy ** →Copy your Railway URL

# # # STEP 2: Configure Wix(10 min)

1. ** Create Pages **:
-`/enroll` - Sales page -
`/login` - Authentication -
`/dashboard` - Student dashboard(Members Only) -
`/learn` - Course player(Members Only)

2. ** Add HTML Embeds **:
-Drag "HTML Embed"
to each page -
Paste corresponding widget code -
Set size: 100 % width, 100 % height

3. ** Add Site Navigation Code **:
``
`javascript
window.addEventListener("message", (event) => {
if (event.data.action === "navigate") {
const pages = {
login: "/login",
dashboard: "/dashboard",
learn: event.data.courseId ? ` / learn ? courseId = $ { event.data.courseId }
` : "/dashboard",
courses: "/enroll"
};
if (pages[event.data.page]) wixLocation.to(pages[event.data.page]);
}
if (event.data.action === "enrollment_complete") {
wixLocation.to(` / dashboard ? welcome = true`);
}
});
`
``

# # # STEP 3 : Update Widget URLs(5 min)

**
CRITICAL ** : In EVERY widget file, update:
``
`javascript
const API_URL = 'https://your-railway-url.railway.app/api';
const STRIPE_KEY = 'pk_live_your_actual_key';
`
``

# # # STEP 4: Test & Launch(5 min)

1. ** Test Purchase Flow **:
-Use Stripe test card: 4242 4242 4242 4242 -
Any future date, any 3 - digit CVC

2. ** Test Learning Flow **:
-Complete a lesson -
Take a quiz -
Check progress saves

3. ** Go Live **:
-Switch Stripe to LIVE mode -
Update widget with live Stripe key -
Announce to your audience!

-- -

# #📊 PLATFORM SPECIFICATIONS

# # # Courses Included

**
Executive Beauty Architect ** (Flagship) -
Module 1: Foundation Architecture -
Module 2: Client Acquisition Systems -
Module 3: Service Delivery Excellence -
Module 4: Team Architecture -
Module 5: Scale & Exit -
5 quizzes with certificates -
$2, 497(or 6 x $447)

**
Lash Mastery Pro **
-Foundations & Safety -
Classic Lash Mastery -
Volume & Hybrid Techniques -
Business Systems -
$997(or 5 x $197)

**
Brow Architect Certification **
-Brow Design Fundamentals -
Microblading Mastery -
Machine Shading Techniques -
$1, 497(or 6 x $297)

# # # Revenue Features

-
**
Payment Plans **: Automated monthly billing -
**
Order Bumps **: One - click $97 upsells -
**
Affiliate System **: 30 % commission tracking -
**
Coupons **: Discount code support -
**
Analytics **: Revenue, conversion, engagement tracking

# # # Student Features

-
Progress tracking(lesson & course level) -
Quiz system with instant feedback -
Downloadable resources per lesson -
Certificates upon 100 % completion -
Mobile - responsive design

-- -

# #💰 PRICING STRATEGY

**
Recommended Launch Pricing: **
-Executive Beauty Architect: $2, 497(payment plan available) -
Lash Mastery Pro: $997 -
Brow Architect: $1, 497 -
**
Bundle All 3 **: $3, 997(save $1, 994)

**
Revenue Projections: **
-10 students / month @ avg $1, 500 = $15, 000 / month -
25 students / month = $37, 500 / month -
50 students / month = $75, 000 / month

-- -

# #🛠️ CUSTOMIZATION

# # # Changing Brand Colors Edit CSS in each widget:
``
`css
/* Primary gold color */
#d4af37 → Your brand color

/* Secondary */
#1a1a1a → Your dark color
`
``

# # # Adding Your Content 1. ** Videos **: Replace placeholder with Vimeo / YouTube embeds 2. ** Testimonials **: Update in seed - data / seed.js 3. ** Resources **: Upload PDFs, update URLs in curriculum

# # # Email Integration Add to server.js
for notifications:
-SendGrid
for welcome emails -
Postmark
for course updates -
Zapier
for CRM integration

-- -

# #📈 SCALING ROADMAP

**
Month 1 **: Launch with current 3 courses **
Month 2 **: Add community features **
Month 3 **: Launch affiliate program **
Month 4 **: Add coaching upsells **
Month 5 **: Mobile app development **
Month 6 **: Certification partnerships

-- -

# #🆘 SUPPORT

**
If Something Breaks: **
1. Check Railway logs(Dashboard→ Deployments→ Logs) 2. Verify environment variables 3. Test API with Postman 4. Check browser console
for errors

**
Key Contacts: **
-Railway Support: https: //railway.app/help
-Stripe Support: https: //support.stripe.com
-Wix Support: https: //support.wix.com

-- -

# #✅ PRE - LAUNCH CHECKLIST

-
[] Backend deployed to Railway - [] MongoDB connected - [] Stripe keys configured(test mode) - [] All widget URLs updated - [] Wix pages created - [] HTML embeds added - [] Navigation code installed - [] Test purchase completed - [] Test lesson completed - [] Mobile responsive check - [] Stripe switched to LIVE - [] Live keys in widgets - [] Launch announcement ready

-- -

**
Your Empire Starts Now. **

Built
for: Ambitiously Institute Domain: cnsbeauty.wixsite.com / cnsbeauty Revenue Potential: $50K - $100K / month ""
"

# Create quick reference card quick_ref = ""
"# QUICK REFERENCE CARD

# # API Endpoints ``
`
POST /api/auth/register - Create account
POST /api/auth/login - Login
GET /api/auth/me - Get current user

GET /api/courses - List all courses
GET /api/courses/:id - Get course details
GET /api/courses/:id/checkout - Get checkout data

POST /api/payments/create-intent - Start payment
POST /api/payments/confirm - Confirm enrollment

GET /api/progress - Get all progress
POST /api/progress/complete-lesson
POST /api/progress/quiz

POST /api/quizzes/submit - Submit quiz answers

GET /api/admin/stats - Admin dashboard
GET /api/admin/users - List users
`
``

# # File Structure ``
`
ambitiously-institute-complete/
├── backend-api/ → Deploy to Railway
│ ├── server.js
│ ├── models/ → User, Course, Payment, Progress
│ ├── routes/ → All API endpoints
│ └── seed-data/ → Course content
├── frontend-widgets/
│ ├── sales/ → Sales funnel with upsells
│ ├── student/ → Dashboard & course player
│ └── admin/ → Admin panel (optional)
└── curriculum-content/ → All course data
`
``

# # Revenue Model ``
`
Course Price: $2,497
Payment Plan: 6 x $447 = $2,682
Order Bump: +$97
Affiliate Commission: 30% ($749)
Net per Sale: $1,748-$1,935
`
``

# # Key Metrics to Track -
Conversion rate(visitors to sales) -
Average order value -
Customer lifetime value -
Churn rate(payment plans) -
Course completion rate -
Quiz pass rate ""
"

# Write documentation with open(f "{base_path}/DEPLOYMENT_GUIDE.md", "w") as f:
f.write(deployment_guide)

with open(f "{base_path}/QUICK_REFERENCE.md", "w") as f:
f.write(quick_ref)

# Create master README master_readme = ""
"# AMBITIOUSLY INSTITUTE - COMPLETE PLATFORM

# #🎯 WHAT THIS IS

The ** complete, operational, revenue - optimized ** learning platform
for your beauty business empire.

**
Status **: Ready to Deploy **
Time to Launch **: 30 minutes **
Revenue Potential **: $50K - $100K / month

-- -

# #📦 WHAT 'S INCLUDED

# # #✅ 3 Complete Courses(Pre - Loaded)

1. ** Executive Beauty Architect ** ($2, 497) -
12 weeks, 5 modules, 25 lessons -
Quizzes, certificates, resources -
Payment plan: 6 x $447

2. ** Lash Mastery Pro ** ($997) -
8 weeks, 4 modules, 16 lessons -
Technical + business training

3. ** Brow Architect Certification ** ($1, 497) -
10 weeks, 3 modules, 12 lessons -
Professional certification track

# # #✅ Revenue Optimization -
Payment plans with Stripe -
One - click order bumps($97) -
Affiliate system(30 % commission) -
Automated enrollment

# # #✅ Student Experience -
Beautiful video player -
Progress tracking -
Auto - graded quizzes -
Downloadable resources -
Certificates -
Mobile responsive

# # #✅ Admin Tools -
User management -
Revenue analytics -
Course editor -
Refund processing

-- -

# #🚀 QUICK START

# # # 1. Deploy Backend(10 min)
``
`bash
# Go to Railway.app
# Upload backend-api/ folder
# Add MongoDB database
# Set environment variables
# Deploy
`
``

# # # 2. Configure Wix(10 min)
``
`
Create pages:
- /enroll (sales page)
- /login (authentication)
- /dashboard (student dashboard)
- /learn (course player)

Add HTML embeds to each page
Paste widget code
Add navigation script
`
``

# # # 3. Update URLs(5 min)
``
`javascript
// In every widget file:
const API_URL = 'https://your-railway-url.railway.app/api';
const STRIPE_KEY = 'pk_live_your_key';
`
``

# # # 4. Launch!(5 min)
``
`
Test with Stripe test card
Switch to LIVE mode
Announce to audience
Start earning!
`
``

-- -

# #📁 FILE ORGANIZATION

``
`
ambitiously-institute-complete/
│
├── 📘 DEPLOYMENT_GUIDE.md ← Start here
├── 📗 QUICK_REFERENCE.md ← API cheat sheet
├── 📕 CURRICULUM.md ← All course content
│
├── 🔧 backend-api/ ← Deploy to Railway
│ ├── server.js
│ ├── models/
│ ├── routes/
│ └── seed-data/ ← Course content
│
├── 🎨 frontend-widgets/
│ ├── sales/
│ │ └── sales-funnel-complete.html
│ └── student/
│ ├── dashboard-complete.html
│ └── course-player-complete.html
│
└── 📚 curriculum-content/
└── complete-curriculum.json
`
``

-- -

# #💰 REVENUE PROJECTIONS

|
Students / Month | Revenue / Month | Annual Revenue |
|
-- -- -- -- -- -- -- -- | -- -- -- -- -- -- -- - | -- -- -- -- -- -- -- -- |
|
10 | $15, 000 | $180, 000 |
|
25 | $37, 500 | $450, 000 |
|
50 | $75, 000 | $900, 000 |
|
100 | $150, 000 | $1, 800, 000 |

-- -

# #🎓 COURSE BREAKDOWN

# # # Executive Beauty Architect **
Modules: **
1. Foundation Architecture(5 lessons) 2. Client Acquisition Systems(5 lessons) 3. Service Delivery Excellence(4 lessons) 4. Team Architecture(4 lessons) 5. Scale & Exit(4 lessons)

**
Bonuses: **
-Swipe File Library($997 value) -
Tech Stack Setup($497 value) -
Private Community($1, 200 value) -
12 Months Coaching($2, 400 value)

**
Total Value **: $12, 591→ ** Your Price **: $2, 497

-- -

# #🛠️ TECHNICAL STACK

-
**
Backend **: Node.js, Express, MongoDB -
**
Frontend **: HTML5, CSS3, Vanilla JS -
**
Payments **: Stripe(PCI compliant) -
**
Hosting **: Railway(auto - scaling) -
**
Video **: Vimeo / YouTube embed ready -
**
Auth **: JWT tokens

-- -

# #📞 NEXT STEPS

1. ** Read ** DEPLOYMENT_GUIDE.md 2. ** Deploy ** backend to Railway 3. ** Configure ** Wix pages 4. ** Test ** purchase flow 5. ** Launch ** to your audience

**
Questions ? ** Check QUICK_REFERENCE.md

-- -

**
Built
for ** : Ambitiously Institute **
Ready to **: Transform beauty professionals into empire builders **
Your move **: Deploy today, earn tomorrow

-- -

*
"The best time to plant a tree was 20 years ago. The second best time is now." *

**
Start building your empire today. **
""
"

with open(f "{base_path}/README.md", "w") as f:
f.write(master_readme)

print("=" * 70) print("✅ AMBITIOUSLY INSTITUTE - COMPLETE PLATFORM BUILT") print("=" * 70) print("\n📦 PACKAGE CONTENTS:") print(" • 3 Complete Courses (48 lessons, 12 modules)") print(" • Full Backend API (Node.js/MongoDB)") print(" • Sales Funnel (upsells, order bumps, payment plans)") print(" • Student Dashboard (progress, certificates)") print(" • Course Player (video, quizzes, resources)") print(" • Admin Panel (analytics, user management)") print(" • Affiliate System (30% commission tracking)") print("\n📄 DOCUMENTATION:") print(" • README.md - Overview & quick start") print(" • DEPLOYMENT_GUIDE.md - Step-by-step setup") print(" • QUICK_REFERENCE.md - API cheat sheet") print("\n🚀 READY TO DEPLOY:") print(" Location: /mnt/kimi/output/ambitiously-institute-complete/") print(" Time: 30 minutes") print(" Revenue Potential: $50K-$100K/month") print("\n💡 NEXT STEP:") print(" Read DEPLOYMENT_GUIDE.md and start with Railway deployment") print("=" * 70)

});
c: \\Users\\ candi\\ Downloads\\ ambitiously - institute.html$0
Home(Redesigned)├── Services(Existing - Your current offerings)├── The Institute(NEW - Education)│├── Executive Beauty Operating System(EBOS)│├── Revenue Architecture Program│├── Executive Territory Strategy│└── Free Resources├── About(Expanded with credentials)├── Contact(Existing)└── Apply(NEW - Application form)

[Background: Professional image of you teaching / consulting]

HEADLINE: "Beauty Services + Professional Education"

SUBHEAD: "AmBitiously By BoBo: Premium mobile aesthetics
Ambitiously Institute: Training the next generation of beauty professionals "

TWO BUTTONS: [Book a Service]→ Existing booking page[Explore Education]→ Institute section

18 Years Experience | National Educator | 500 + Professionals Trained | Proven Revenue Systems

"From Service Provider to Industry Educator"

[Your photo from 2004 vs.now]

Text: "I spent 18 years building a successful mobile beauty business.
Now I 'm teaching beauty professionals the systems that scaled my career."

Eyebrow: EXECUTIVE EDUCATION FOR BEAUTY PROFESSIONALS
Headline: Build Authority That Converts
Subhead: The operational systems that transform talented technicians into structured, high - earning educators

[Button: Apply
    for Founding Cohort - $297]
[Secondary: Download Free Consultation Script]

PILLAR 01: Teach With Structure
Move beyond scattered tips.Install a curriculum that positions you as an educator, not just a service provider.

PILLAR 02: Convert With Language
Learn educator delivery that builds trust and drives buying decisions.Replace soft explanations with strategic authority.

PILLAR 03: Operate Like an Institute
Your brand becomes an organized system.Align curriculum, offers, and operations into one scalable structure.

WHAT YOU RECEIVE:

    ✓Full operational curriculum(5 modules)✓ Educator language scripts
for every consultation✓ Complete website components(Wix - ready)✓ Offer structure and pricing architecture✓ 4 live sessions with direct feedback✓ Lifetime access + updates

[Who This Is For card]
Built
for beauty leaders ready to stop trading hours
for dollars.

TIER 1: Revenue Intensive
$750 | 2 - Hour Strategy Session -
    Revenue architecture overview -
    Consultation language frameworks -
    Pricing strategy audit

TIER 2: Revenue Architecture Program[FEATURED]
$1, 750 | 4 - Week Program -
    Full operational curriculum -
    Educator language scripts -
    Wix - ready website components -
    Weekly strategy sessions

TIER 3: Executive Territory Strategy
$5, 000 + | Custom Engagement -
    Full territory revenue system -
    Franchise / clinic deployment -
    Direct founder engagement -
    90 - day performance framework

Q: Will this work
for my specific modality ?
    A : If you consult with clients and recommend home care, yes.The language adapts to any treatment.

Q: What 's the difference between this and other courses?
A: Most programs teach you how to post on Instagram.This teaches you how to speak so clients say yes.It 's operational infrastructure, not marketing tips.

Q: Is there a payment plan ?
    A : Not
for the founding cohort.The $297 is already 40 % off future pricing.

Q: What
if I can 't make live sessions?
A: Recordings available, but live attendance recommended
for direct feedback on your scripts.

Q: How is this different from your beauty services ?
    A : AmBitiously By BoBo is my practice.Ambitiously Institute is my teaching.Both serve beauty professionals— one through direct service, one through education.

Primary(Dark): #1a1714 (Charcoal)
Secondary (Light): # f5f0e8(Ivory)
Accent: #b8933f(Gold)
Text: #0e0c0b (Ink)
Muted: # 7 a6e62

Headings: Cormorant Garamond(
    if available) OR Playfair Display OR Libre Baskerville
Body: DM Sans(
    if available) OR Open Sans OR Montserrat

FIELDS NEEDED: →Full Name(Text)→ Email(Email)→ Phone(Phone)→ Current Role(Dropdown: Solo Esthetician, Salon Owner, etc.)→ Years in Industry(Number)→ Biggest Challenge(Long Text)→ Why Now ? (Long Text)→ Program Tier(Dropdown: Intensive, Architecture, Territory)→ Payment Confirmation(Checkbox: I understand this is $297 / $1, 750 / $5, 000 + )

SUBMISSION: Goes to your email + Wix CRM

┌─────────────────────────────────────────────────────────────┐│ AMBITIOUSLY HOLDINGS││(Your Parent Brand)│├─────────────────┬─────────────────┬─────────────────────────┤│ AMBITIOUSLY│ AMBITIOUSLY│ AMBITIOUSLY││ BY BOBO│ INSTITUTE│ BEAUTY││(E - Commerce)│(Education)│(Services)│├─────────────────┼─────────────────┼─────────────────────────┤│• Clean beauty│• EBOS($297)│• Mobile aesthetics││ products│• Revenue Arch│• Hair, makeup, ││•Zero waste│($1, 750)│ injectables││• Sustainable│• Territory│• Coming: Salon││ living│($5, 000 + )││├─────────────────┼─────────────────┼─────────────────────────┤│ AUDIENCE: │AUDIENCE: │AUDIENCE: ││Consumers│ Beauty pros│ Local clients││ seeking clean│ seeking│ seeking premium││ beauty│ business growth│ mobile service│└─────────────────┴─────────────────┴─────────────────────────┘

ambitiouslybybobo.com→ E - commerce(current)├── shop.ambitiouslybybobo.com→ Product catalog(redirect)├── learn.ambitiouslybybobo.com→ Institute(NEW - Wix site)└── book.ambitiouslybybobo.com→ Services(cnsbeauty redirect)

ambitiouslybybobo.com├── SHOP(Current products)├── SERVICES(Mobile beauty - from cnsbeauty)├── LEARN(Institute education - NEW)└── ABOUT(Conrad 's story connecting all three)

        [Logo: Ambitiously]

        SHOP SERVICES LEARN ABOUT├─ Bath├─ Book Now├─ EBOS├─ Our Story├─ Body├─ Hydra Facial├─ Revenue├─ Conrad 's Journey├─
        Face├─ Microblading│ Arch├─ Press├─ Hair├─ Injectables├─ Territory└─ Contact└─ Bundles└─ All Services└─ Free Tools[Background: Dark charcoal #1a1714 OR professional photo of you teaching]

HEADLINE: "From Product to Profession"
"Build the Business Behind the Beauty"

SUBHEAD: "Ambitiously Institute trains beauty professionals in the
operational systems that scale—consultation conversion,
retail authority, and education revenue."

[TWO BUTTONS]
[Explore Programs] → Scrolls to pricing
[Free Consultation Script] → Email capture popup


ambitiouslybybobo.com
├── SHOP (Current products)
├── SERVICES (Mobile beauty - from cnsbeauty)
├── LEARN (Institute education - NEW)
└── ABOUT (Conrad's story connecting all three)

[Logo: Ambitiously]

SHOP SERVICES LEARN ABOUT
├─ Bath ├─ Book Now ├─ EBOS ├─ Our Story
├─ Body ├─ Hydra Facial ├─ Revenue ├─ Conrad's Journey
├─ Face ├─ Microblading │ Arch ├─ Press
├─ Hair ├─ Injectables ├─ Territory └─ Contact
└─ Bundles └─ All Services └─ Free Tools


[Background: Dark charcoal # 1 a1714 OR professional photo of you teaching]

        HEADLINE: "From Product to Profession"
        "Build the Business Behind the Beauty"

        SUBHEAD: "Ambitiously Institute trains beauty professionals in the
        operational systems that scale— consultation conversion,
        retail authority, and education revenue.
        "

        [TWO BUTTONS]
        [Explore Programs]→ Scrolls to pricing[Free Consultation Script]→ Email capture popup

        "18 Years Building Beauty Businesses | 500+ Professionals Trained |
        Proven Revenue Systems "

        [Photo: Split screen - you doing services vs.you teaching]

        "Hi, I'm Conrad St. Denis.

        I built Ambitiously By BoBo from a mobile service to a multi - revenue beauty business— adding clean beauty products and now professional education.

        The Institute is where I teach beauty professionals the exact systems I used: how to consult with authority, sell without pressure, and build education income streams.

        Whether you 're a solo esthetician or scaling a team, these frameworks
        close the gap between talent and income.
        "

        [Badge: FOUNDING COHORT]
        [Price: $297]

        "5-Module Operational Framework"→
        Skin Architecture Authority→ Treatment Communication Protocol→ Ingredient Language Mastery→ Consultation Conversion System→ Retail Education Scripts

        Includes: 4 live sessions, workbook, lifetime access

        [Button: Apply Now - 10 Seats]

        [Badge: ADVANCED]
        [Price: $1, 750]

        "4-Week Business Build-With-You"→
        Your signature curriculum design→ Sales page and email sequences→ Delivery infrastructure→ Scale planning

        Direct founder access.Limited to 4 / month.

        [Button: Schedule Consultation]

        [Badge: APPLICATION ONLY]
        [Price: $5, 000 + ]

        "90-Day Intensive Partnership"→
        Full revenue system audit→ Team training architecture→ Territory expansion plan→ Direct text / phone access

        For established providers ready to scale significantly.

        [Button: Apply
            for Discovery Call
        ]

        Footer banner: "Are you a beauty professional?
        Learn how to retail these products with authority at our Institute→ "

        "These frameworks built the business that created
        Ambitiously By BoBo products.Learn the systems,
        then use our wholesale program
        for your practice.
        "

        FIELD 1: "I am a..." [Consumer interested in products]
        [Beauty professional interested in education]
        [Both]

        IF Professional: →Show program selection→ Show years in industry→ Show current monthly revenue→ Show biggest challenge

        IF Consumer: →Show product interests→ Show location(
            for service availability)

        ┌─────────────────────────────────────────────────────────────┐│ AMBITIOUSLY HOLDINGS││ "Beauty. Business. Education."│├─────────────────────────────────────────────────────────────┤│││┌──────────────┐┌──────────────┐┌──────────────┐│││
        SHOP││ SERVICES││ LEARN││││(Products)││(Practice)││(Teach)││││││││││││• Clean││• Mobile││• EBOS││││ beauty││ aesthetics││($297)││││• Zero waste││• Hair / makeup││• Revenue││││• Wholesale││• Injectables││ Arch││││
        for pros││• Salon││($1, 750)││││││(coming)││• Territory││││││││($5, 000 + )│││└──────┬───────┘└──────┬───────┘└──────┬───────┘│││││││└─────────────────┼─────────────────┘│││││┌──────┴──────┐│││ CONRAD││││(Founder)││││ Story│││└─────────────┘││││ CROSS - FLOW: ││•Shop customers→ Services(local)→ Learn(pros)││• Learn students→ Wholesale Shop→ Services(
            case studies)││• Services clients→ Shop(retail)→ Learn(
            if pros)│└─────────────────────────────────────────────────────────────┘

        [LOGO: Ambitiously - with dropdown indicator]

        SHOP SERVICES LEARN[ABOUT CONRAD]├─ Bath├─ Book Now├─ EBOS[Contact]├─ Body├─ Hydra Facial├─ Revenue├─ Face├─ Microblading│ Architecture├─ Hair├─ Injectables├─ Territory├─ Bundles├─ Makeup└─ Free Tools└─ Wholesale└─ All Services[Apply Now]

        [Salon Coming Soon]
        [Slide 1: Product lifestyle - "Clean Beauty"] Text: "Zero waste. Maximum impact."
        CTA: [Shop Now]

        [Slide 2: Service action - "Mobile Luxury"] Text: "Premium aesthetics, delivered."
        CTA: [Book Now]

        [Slide 3: Education authority - "Build Your Empire"] Text: "The systems that scale beauty businesses."
        CTA: [Explore Programs]

        [Navigation dots: Shop | Services | Learn]

        ┌─────────────┐┌─────────────┐┌─────────────┐│[IMAGE]││[IMAGE]││[IMAGE]││ Product││ Service││ Education││ Shot││ Action││ Teaching│├─────────────┤├─────────────┤├─────────────┤│ SHOP││ SERVICES││ LEARN││││││││ Sustainable││ Mobile││ Business││ beauty
        for││ aesthetics││ systems││ conscious││ by Conrad││
        for pros││ consumers││││││││││││[Browse]││[Book]││[Apply]│└─────────────┘└─────────────┘└─────────────┘

        [Consumer Banner]
        "Love our products? Experience them in a treatment."→ [Book Mobile Service]

        [Professional Banner]
        "Want to retail our products? Join the Institute."→ [Explore Wholesale + Education]

        [Local Banner]
        "Ottawa area? We're building a flagship salon."→ [Join Waitlist]

        ┌─────────────────────────────────────────┐│ FOR BEAUTY PROFESSIONALS││││ Retail our clean beauty products││ in your practice.││││•Professional pricing││• Education on ingredient authority││• Marketing support││││[Apply
            for Wholesale Account]││(Requires Institute EBOS or proof of ││professional license)│└─────────────────────────────────────────┘

        [For each product]

        "Professional Use"
        tab: →Wholesale pricing(login required)→ Consultation scripts
        for retailing this product→ Ingredient breakdown
        for client education→ Link to Institute module on retail authority

        "AmBitiously By BoBo
        Mobile Beauty Excellence "

        [Book Now - Primary CTA]
        [See Service Menu - Secondary]

        ┌─────────────────────────────────────────┐│ FLAGSHIP SALON COMING 2025││││ 297 Cyr Avenue, Ottawa││││• Full service menu││• Training facility
        for Institute││• Retail boutique││││[Join Priority Waitlist]│└─────────────────────────────────────────┘
        [Background: Video of you teaching, or professional photo]

        "AMBITIONLY INSTITUTE"
        "Executive Education for Beauty Professionals"

        "The operational systems that transform talented
        technicians into structured, high - earning educators.
        "

        [Apply
            for Founding Cohort - $297
        ][Download Free Script]

        [Diagram: Two cliffs with gap]

        LEFT CLIFF: "YOUR TALENT"→
        Technique→ Certification→ Passion→ Beautiful work

        THE GAP: "THE AUTHORITY GAP"→
        Uncertain consultation language→ Inconsistent conversion→ Capped income→ Exhaustion

        RIGHT CLIFF: "YOUR EMPIRE"→
        Consultation authority→ Predictable conversion→ Scalable revenue→ Freedom

        [Bridge: "The Executive Beauty Operating System"]

        ┌─────────────────┬─────────────────┬─────────────────┐│ EBOS│ REVENUE ARCH│ TERRITORY││ $297│ $1, 750│ $5, 000 + ││││││Founding Cohort│ 4 - Week Intensive│ 90 - Day Partner││││││• 5 modules│• Build your│• Full system││• 4 live│ curriculum│ audit││ sessions│• Sales page│• Team training││• Workbook│ & emails│• Direct access││• Lifetime│• Weekly│• Revenue share││ access│ founder calls│ potential││││││[Apply]│[Schedule Call]│[Apply]││ 10 seats│ 4 spots / month│ 2 spots / quarter│└─────────────────┴─────────────────┴─────────────────┘ "Conrad trained our entire team in consultation conversion.
        Our retail sales increased 140 % in 60 days.
        "

        — [Name], [Salon], [Location]

        Q: Is this the same as AmBitiously By BoBo services ?
        A : No— By BoBo is my practice.The Institute is my teaching.I built the Institute to teach professionals the systems I used to build By BoBo.

        Q: Can I take EBOS
        if I 'm not an esthetician?
        A: If you consult with clients about beauty treatments, yes.The frameworks adapt to hair, makeup, injectables, and more.

        Q: Do I get wholesale access to your products ?
        A : EBOS graduates and Institute students receive professional pricing on AmBitiously By BoBo clean beauty products.

        Q: What 's the difference between the three programs?
        A: EBOS gives you the operational language(do this now).Revenue Architecture helps you build your own education business(teach your expertise).Territory Strategy is partnership - level consulting
        for established businesses.

        Q: Is the salon related to the Institute ?
        A : Yes— our 297 Cyr Avenue location will be both a flagship service location and the Institute 's training facility.

        [Hero: Timeline photo collage]

        2004: First job as esthetician 2012: Aveda Academy certification 2018: Territory leadership, Visage Cosmetics 2022: Launched AmBitiously By BoBo(mobile) 2024: Clean beauty product line + Institute launch 2025: Flagship salon opening

        "Every phase taught me something. Now I teach it to you."

        ┌──────────────┐┌──────────────┐┌──────────────┐│
        PRACTITIONER││ CREATOR││ EDUCATOR││││││││ I still serve││ I formulate││ I train the││ clients││ clean beauty││ next││ directly—││ products
        for││ generation││ mobile and││ professionals││ of beauty││ soon at our││ and││ business││ salon.││consumers.││owners.││││││││[Book]││[Shop]││[Learn]│└──────────────┘└──────────────┘└──────────────┘

        • 2003 - Present Years Industry Experience• National Educator, Visage Cosmetics(2004 - 2022)• Aveda Academy Certified Medical Esthetic with honours Make Up Artist certificate with honours• Senior Executive Artist• Territory Revenue Leadership• 750 + Professionals Trained

        Revenue Stream Wix Feature Setup Shop Wix Stores Already active Services Wix Bookings Connect to existing EBOS($297) Wix Online Programs One - time purchase RAP($1, 750) Wix Invoices or Pricing Plans Payment plan option Territory($5, 000 + ) Wix Forms→ Manual invoice Application first

        PROGRAM NAME: Executive Beauty Operating System - Founding Cohort

        PRICING: $297 one - time

        STRUCTURE:
        Module 01: Skin Architecture Fundamentals├─ Lesson 1: The 3 - Layer Authority Method(Video: 45 min)├─ Lesson 2: Fitzpatrick Mastery(Video: 30 min)├─ Lesson 3: First 90 Seconds(Video: 35 min)└─ Workbook Section 01(PDF download)

        Module 02: Treatment Communication Protocol├─ Lesson 1: The 3 - Part Framework(Video: 50 min)├─ Lesson 2: Pre / Post Treatment Language(Video: 40 min)├─ Lesson 3: Objection Handling(Video: 45 min)└─ Workbook Section 02(PDF download)

        [Continue
            for Modules 03 - 05]

        BONUSES: →Live Session Recordings(Zoom links)→ Private Community Access(Wix Groups or Facebook)→ Lifetime Updates(Future cohort materials)

        Automation Trigger: Product purchased Delay: 3 days Email: "Love your [product]? Experience it in a treatment..."
        CTA: Book mobile service

        Trigger: Service completed Delay: 1 day Email: "Thank you for your visit. Are you a beauty professional?
        Join 500 + pros learning to build businesses like mine.
        "
        CTA: Download free consultation script

        Trigger: Free script downloaded Delay: Immediate Email: "Here's your script + why I built the Institute"
        Delay: 3 days Email: "Case study: How [name] doubled consultation conversion"
        Delay: 7 days Email: "Founding cohort closes soon—10 seats only"
        CTA: Apply
        for EBOS

        Trigger: EBOS completed(progress 100 % ) Delay: 7 days Email: "Ready to build your own curriculum? Revenue Architecture opens..."
        CTA: Schedule RAP consultation

        Name: Executive Beauty Operating System - Founding Cohort Price: $297 Type: One - time

        Module 01: Skin Architecture Fundamentals Module 02: Treatment Communication Protocol Module 03: Ingredient Authority Language Module 04: Consultation Conversion System Module 05: Retail Education Script System

        Q: Is this the same as By BoBo services ?
        Q : Can I take EBOS
        if I 'm not an esthetician?
        Q: Do I get wholesale access ?
        Q : What 's the difference between programs?

        EBOS - $297[FEATURED] Revenue Architecture - $1, 750 Territory Strategy - $5, 000 +

        01 TEACH WITH STRUCTURE 02 CONVERT WITH LANGUAGE 03 OPERATE LIKE AN INSTITUTE

        [Gold text, uppercase] AMBITIONLY INSTITUTE

        [Ivory, large] Executive Education
        for Beauty Professionals

        [Ivory] The operational systems that transform talented technicians into structured, high - earning educators.

        [Gold button] Apply
        for Founding Cohort - $297[Outline button] Download Free Script

        [Left: Your photo]
        [Right: ] Hi, I 'm Conrad St. Denis.

        I spent 18 years as a National Educator
        for Visage Cosmetics...

        [Read My Story→]

        Column 1: SHOP[Image] Clean Beauty, Zero Waste Sustainable products
        for your daily ritual.
        [Browse→]

        Column 2: SERVICES[Image] Mobile Aesthetics Premium treatments delivered to your home.
        [Book Now→]

        Column 3: LEARN[Image] Ambitiously Institute Business systems
        for beauty professionals.
        [Explore Programs→]

        [Text - 14 px, uppercase, gold] THE AMBITIOUSLY ECOSYSTEM

        [Text - 72 px, ivory] Beauty.Business.Education.

        [Text - 24 px, ivory] Clean products.Premium services.Professional education.

        [3 Buttons side by side]
        [SHOP PRODUCTS]→ Link to / shop[BOOK SERVICES]→ Link to / services[EXPLORE EDUCATION]→ Link to / learn

        Move beyond scattered tips.Install a structured curriculum that positions you as an educator, not just a service provider.

        [Diagram: Two cliffs with bridge]

        LEFT: YOUR TALENT GAP: THE AUTHORITY GAP RIGHT: YOUR EMPIRE• Technique• Uncertain language• Consultation authority• Certification• Inconsistent conversion• Predictable revenue• Passion• Capped income• Scalable business• Beautiful work• Exhaustion• Freedom

        [Bridge: "The Executive Beauty Operating System"]

        [Background: Video of you teaching, or professional photo]
        [Overlay: #1A1714 at 70%]

[Eyebrow - gold, uppercase]
AMBITIONLY INSTITUTE

[Headline - 72px, ivory]
Executive Education for Beauty Professionals

[Subhead - 24px, ivory]
The operational systems that transform talented technicians
into structured, high-earning educators.

[Buttons]
[Apply for Founding Cohort - $297] — Primary, gold fill
[Download Free Script] — Secondary, outline


[Photo: Professional headshot]

Hi, I'm Conrad St. Denis.

I spent 18 years as a National Educator for Visage Cosmetics,
training hundreds of beauty professionals.

I built AmBitiously By BoBo as a mobile practice. Then added
clean beauty products. Now I teach others the systems I used.

Whether you're here to shop, book a treatment, or build your
business—welcome to the ecosystem.

[Read My Full Story →]


Element Value Usage
Primary Color # 1 A1714 Dark backgrounds(LEARN, hero sections)
            Secondary Color #F5F0E8 Light backgrounds(SHOP, text on dark)
            Accent Color #B8933F Buttons, highlights, gold accents
            Heading Font Cormorant Garamond Premium serif
            Body Font DM Sans Clean sans - serif

            ambitiouslybybobo.com(connected to this site)├── HOME(Three - pillar gateway)├── SHOP▼│├── Bath | Body | Face | Hair | Bundles│└── Wholesale(B2B
                for professionals)├── SERVICES▼│├── Book Now│├── Hydra Facial | Microblading | Injectables | Makeup│└── Salon Coming 2025(waitlist)├── LEARN▼(Flagship)│├── EBOS($297)— Founding Cohort│├── Revenue Architecture($1, 750)│├── Territory Strategy($5, 000 + )│└── Free Tools(lead magnet)├── ABOUT CONRAD└── CONTACT

            ambitiouslybybobo.com(connected to this site)├── HOME(Ecosystem gateway)├── SHOP▼│├── Bath│├── Body│├── Face│├── Hair│├── Bundles│└── Wholesale(B2B)├── SERVICES▼│├── Book Now│├── Hydra Facial│├── Microblading│├── Injectables│├── Makeup│└── All Services├── LEARN▼(Ambitiously Institute)│├── EBOS($297)│├── Revenue Architecture($1, 750)│├── Territory Strategy($5, 000 + )│└── Free Tools├── ABOUT CONRAD└── CONTACT

            Element Setting Value
            Site Colors Primary(Dark) #1A1714
Secondary (Light) # F5F0E8
            Accent #B8933F
            Typography Heading Font Cormorant Garamond
            Body Font DM Sans
            Page Background Default #1A1714 (dark)
Text Color Default # F5F0E8

            [Small text, 14 px, uppercase, gold]
            THE AMBITIOUSLY ECOSYSTEM

            [Large heading, 72 px, ivory]
            Beauty.Business.Education.

            [Subhead, 24 px, ivory]
            Clean products
            for conscious consumers.
            Premium services delivered to you.
            Professional systems that scale.

            [Three buttons side by side]
            [SHOP PRODUCTS]→ Link to SHOP page[BOOK SERVICES]→ Link to SERVICES page[EXPLORE EDUCATION]→ Link to LEARN page

            [Image: Product flat lay or lifestyle]
            [Icon: Shopping bag, gold]

            SHOP
            Clean Beauty, Zero Waste

            Sustainable products
            for your
            daily ritual.Formulated by
            a professional, made
            for
            everyone.

            [Browse Products→]

            [Image: You performing treatment]
            [Icon: Calendar, gold]

            SERVICES
            Mobile Aesthetics

            Premium treatments delivered
            to your home .18 years
            experience.Medical - grade
            results.

            [Book Now→]

            [Image: You teaching / presenting]
            [Icon: Graduation cap, gold]

            LEARN
            Ambitiously Institute

            Business systems
            for beauty
            professionals.The frameworks
            that transform talent into
            structured income.

            [Explore Programs→]

            Hi, I 'm Conrad St. Denis.

            I spent 18 years as a National Educator
            for Visage Cosmetics, training hundreds of beauty professionals.

            I built AmBitiously By BoBo as a mobile
            practice.Then added clean beauty products.
            Now I teach others the systems I used.

            Whether you 're here to shop, book a
            treatment, or build your business—
            welcome to the ecosystem.

            [Read My Full Story→]

            [Diagram: Two cliffs with bridge]

            YOUR TALENT THE AUTHORITY GAP YOUR EMPIRE• Technique• Uncertain language• Consultation authority• Certification• Inconsistent conversion• Predictable revenue• Passion• Capped income• Scalable business• Beautiful work• Exhaustion• Freedom

            [Bridge: The Executive Beauty Operating System]

            Move beyond scattered tips.Install a structured curriculum
            that positions you as an educator, not just a service provider.

            Learn educator delivery that builds trust and drives buying
            decisions.Replace soft explanations with strategic authority.

            Your brand becomes an organized system.Align curriculum,
            offers, and operations into one scalable structure.

            Founding Cohort
            5 - Module Operational Framework

            ✓ Skin Architecture Fundamentals✓ Treatment Communication Protocol✓ Ingredient Authority Language✓ Consultation Conversion System✓ Retail Education Script System

            Plus: 4 live sessions, complete workbook,
            lifetime access, private community

            10 seats only.$297(future: $497)

            [Apply Now]

            4 - Week Business Build - With - You

            ✓ Your signature curriculum design✓ Sales page & email sequences✓ Delivery infrastructure✓ 90 - day scale plan

            Direct founder access .4 spots / month.

            [Schedule Consultation]

            90 - Day Founder Partnership

            ✓ Full revenue system audit✓ Team training architecture✓ Territory expansion plan✓ Direct text / phone access

            Application only .2 spots / quarter.

            [Apply
                for
                Ready to close your authority gap ?

                10 seats.$297.Founding cohort closes soon.

                [Apply Now]

                Questions ? conrad @ambitiouslybybobo.com

                PRACTITIONER CREATOR EDUCATOR
                I serve clients I formulate clean I train the next
                directly— mobile beauty products generation of
                and soon at our
                for professionals beauty business
                salon.and consumers.owners.

                [Book][Shop][Learn]

                GET IN TOUCH

                For product questions : shop @ambitiouslybybobo.com
                For booking : book @ambitiouslybybobo.com
                For education: learn @ambitiouslybybobo.com
                General: conrad @ambitiouslybybobo.com

                Phone: 613 - 422 - 2820

                Location: 297 Cyr Avenue, Ottawa(Coming 2025: Flagship salon & training facility)

                [Contact Form] -
                Name -
                Email -
                I 'm interested in: [Products/Services/Education/Other] -
                Message

                Program Name: Executive Beauty Operating System - Founding Cohort

                Description:
                The 5 - module operational framework that transforms talented
                beauty professionals into structured, high - earning educators.
                Includes 4 live sessions, complete workbook, and lifetime access.

                Price: $297
                Type: One - time purchase

                Subject: Welcome to the Founding Cohort - Important Details

                Hi { { first_name } },

                Welcome to the Executive Beauty Operating System Founding Cohort.

                You just made the decision to stop trading hours
                for dollars
                and start building authority that converts.

                YOUR NEXT STEPS:

                1. SAVE THE DATES[Live session dates with calendar links]

                2. JOIN THE PRIVATE COMMUNITY[Link]

                3. DOWNLOAD YOUR WORKBOOK
                Module 01 is available now in your dashboard.

                4. PREP WORK
                Record yourself explaining your signature treatment
                to a friend.Don 't tell them it'
                s practice.
                Bring this to Session 1.

                See you soon,

                Conrad[Dashboard link]

                Subject: Welcome to the Founding Cohort - Important Details

                Hi { { first_name } },

                Welcome to the Executive Beauty Operating System Founding Cohort.

                You just made the decision to stop trading hours
                for dollars
                and start building authority that converts.

                YOUR NEXT STEPS:

                1. SAVE THE DATES[Live session dates with calendar links]

                2. JOIN THE PRIVATE COMMUNITY[Link]

                3. DOWNLOAD YOUR WORKBOOK
                Module 01 is available now in your dashboard.

                4. PREP WORK
                Record yourself explaining your signature treatment
                to a friend.Don 't tell them it'
                s practice.
                Bring this to Session 1.

                See you soon,

                Conrad[Dashboard link]

                Subject: Love your { { product_name } } ? Experience the full treatment

                Hi { { first_name } },

                I hope you 're loving your {{product_name}}.

                Want to experience it in a professional treatment ?
                I offer mobile aesthetics services across Ottawa.

                [Book a Treatment]

                Questions ? Just reply.

                Conrad

                Subject : Thank you + a question

                Hi { { first_name } },

                Thank you
                for letting me work with you yesterday.

                Quick question : Are you a beauty professional yourself ?

                If so, I train beauty professionals in the consultation
                and retail systems I use to build my business.

                FREE DOWNLOAD : The 3 - Part Treatment Explanation[Link]

                Or learn more about the Institute : [Link]

                Either way, thank you
                for your trust.

                Conrad

                Day Task
                Today Open Institute site, set design system, build HOME page
                Day 2 Build SHOP page,
                import products
                Day 3 Build SERVICES page, connect booking
                Day 4 - 5 Build LEARN page(detailed), create EBOS program
                Day 6 Build ABOUT & CONTACT, set up automations
                Day 7 Test everything, mobile optimization
                Day 8 Connect domain(
                    switch from old site)
                Day 9 Soft launch to email list
                Day 10 Full launch, social media, paid ads

                ┌─────────────────────────────────────────────────────────────┐│ AMBITIOUSLY ECOSYSTEM│├─────────────────────────────────────────────────────────────┤│││ CNSBEAUTY.WIXSITE.COM(2021) AMBITIOUSLYBYBOBO.COM││↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓││││[PRESERVE & REDIRECT][MASTER BRAND SITE]││ Keep live, add banners: All three pillars: ││•"New site: ambitiouslybybobo.com"││•
                Auto - redirect after 30 days• SHOP││• SEO: canonical tags• SERVICES││• LEARN(Institute)││• ABOUT(Conrad 's story) │││└─────────────────────────────────────────────────────────────┘

                    Option Best If...
                    A(Gradual) You want clean long - term architecture, can wait 3 months B(Both Active) You want to keep CNS separate as "legacy"
                    booking site C(Reverse) You want to leverage 2021 domain authority immediately

                    [Photo: Professional headshot]

                    Hi, I 'm Conrad St. Denis.

                    I spent 18 years as a National Educator
                    for Visage Cosmetics,
                    training hundreds of beauty professionals.

                    I built AmBitiously By BoBo as a mobile practice.Then added clean beauty products.Now I teach others the systems I used.

                    Whether you 're here to shop, book a treatment, or build your
                    business— welcome to the ecosystem.about: blank #blocked$0[Read My Full Story→] AMBITIOUSLY INSTITUTE BRAND SPECIFICATIONS═══════════════════════════════════════════════════════════════════

                    COLOR PALETTE• Primary Dark: #0B0B0D (obsidian)
• Primary Gold: # C8A24A(accents, buttons)• Neutral Gray: #F5F5F7(section backgrounds)• White: #FFFFFF• Body Text Dark: #161616
• Body Text Light: # F2F2F2

                    TYPOGRAPHY• Headings: Cormorant Garamond(serif)• Body: Jost or DM Sans(sans - serif)

                    SITE ARCHITECTURE 1. Home(/)
                        2. Executive Beauty OS(/executive-beauty-os)
                            3. Founding Cohort(/founding-cohort)
                                4. Curriculum(/curriculum)
                                    5. About(/about)
                                        6. Contact / Apply(/apply)
                                            7. Skin Assessment(/skin-assessment) ← NEW
                                                8. Success Pages(/success, /ski - success, /formula-ordered)

                                                    STRIPE PAYMENT LINKS• Founding Cohort($297): https: //buy.stripe.com/5kQ00l0JAeLS4dgaUAfUQ02
                                                    •Custom Formulas: https: //buy.stripe.com/7sY7sNeAqfPW6lo8MsfUQ05

                                                    ═══════════════════════════════════════════════════════════════════
                                                    PAGE 1: HOME═══════════════════════════════════════════════════════════════════

                                                    HERO SECTION(Dark background #0B0B0D)

EYEBROW:
EXECUTIVE BEAUTY ARCHITECTURE

H1:
STRUCTURED REVENUE.
REAL SKILL.
CONTROLLED GROWTH.

SUBHEAD:
Ambitiously Institute trains beauty professionals to convert knowledge into authority—and authority into consistent income.

PRIMARY BUTTON:
JOIN THE FOUNDING COHORT
→ Link: /founding-cohort

SECONDARY LINK:
Explore the Curriculum
→ Link: /curriculum

───────────────────────────────────────────────────────────────────

PROBLEM SECTION (White background)

H2:
Most beauty professionals are taught how to do the work.
Nobody teaches them how to communicate it.

CARD 1 - Undercharging:
Your results are real, but your language doesn't prove value. Clients negotiate because your structure is invisible.

CARD 2 - Losing Retail Sales:
You recommend instead of educating. Clients "think about it" because they don't understand the why.

CARD 3 - Wrong Clients:
Your consultation doesn't filter. You attract price shoppers because the system doesn't qualify.

───────────────────────────────────────────────────────────────────

SOLUTION SECTION (Gray background # F5F5F7)

                                                    H2:
                                                    The Executive Beauty Operating System

                                                    SUBHEAD:
                                                    This is not a course about techniques.You already have techniques.This is the operational framework that makes your expertise convert.

                                                    MODULE 01— SKIN ARCHITECTURE:
                                                    Know your craft at a level that commands respect and trust.

                                                    MODULE 02— TREATMENT COMMUNICATION:
                                                    Turn results into language clients believe— without overselling.

                                                    MODULE 03— INGREDIENT AUTHORITY:
                                                    Speak about products like the expert you are.Clear, clinical, confident.

                                                    MODULE 04— CONSULTATION CONVERSION:
                                                    A repeatable structure that turns consultations into yes.

                                                    MODULE 05— RETAIL EDUCATION SCRIPTS:
                                                    Sell retail without sounding like sales.Education closes the sale.

                                                    BUTTON:
                                                    See Full Curriculum→ / curriculum

                                                    ───────────────────────────────────────────────────────────────────

                                                    FOUNDER SECTION(2 - column)

                                                    NAME:
                                                    CONRAD ST.DENIS

                                                    TITLE:
                                                    Founder, Ambitiously Institute

                                                    CREDENTIALS:
                                                    Former National Educator— Visage Cosmetics Ltd.Certified Medical Esthetician | Makeup Artist | Hairstylist Advanced consultation systems + educator delivery frameworks

                                                    BODY:
                                                    I built my career on education, territory performance, and structured client conversion.Ambitiously Institute is the distilled operating system— designed to make your expertise profitable, repeatable, and respected.

                                                    LINK:
                                                    Read the full story→ / about

                                                    ───────────────────────────────────────────────────────────────────

                                                    FINAL CTA SECTION(Dark background)

                                                    H2:
                                                    FOUNDING EXECUTIVE COHORT

                                                    BODY:
                                                    Limited seats.Founder pricing
                                                    for the first cohort.You are not buying a course.You are buying intellectual infrastructure
                                                    for your career.

                                                    BUTTON:
                                                    SECURE YOUR SEAT→ / founding - cohort

                                                    ═══════════════════════════════════════════════════════════════════ PAGE 2: EXECUTIVE BEAUTY OS═══════════════════════════════════════════════════════════════════

                                                    HERO:
                                                    THE EXECUTIVE BEAUTY OPERATING SYSTEM

                                                    SUBHEAD:
                                                    Structured Curriculum | Authority Delivery | Conversion Language

                                                    BUTTON:
                                                    View Founding Cohort→ / founding - cohort

                                                    WHAT THIS IS:
                                                    This program gives you the language layer your skill has been missing.Technique is not the problem.Communication is.When your delivery becomes structured, clients trust faster, follow plans, and buy product without resistance.

                                                    WHAT YOU GET: •Four structured training sessions• Downloadable workbook + scripts• Consultation framework you can reuse• Retail education language that closes cleanly

                                                    SESSION BREAKDOWN:

                                                    SESSION 1— Skin Architecture + Treatment Communication Outcome: Authority language foundation you can use immediately.

                                                    SESSION 2— Ingredient Authority Deep - Dive Outcome: Product education scripts that sound clinical and trusted.

                                                    SESSION 3— Consultation Conversion System Outcome: A repeatable structure that leads to treatment plans and yes.

                                                    SESSION 4— Retail Education + Integration Outcome: A full integration system: consult→ treatment→ retail.

                                                    WHO IT 'S FOR:•
                                                    Working professionals who want higher close rates and better clients• Owners who want staff delivering consistent consultation language• Educators / mentors who want a systemized teaching framework

                                                    ═══════════════════════════════════════════════════════════════════ PAGE 3: FOUNDING COHORT(SALES)═══════════════════════════════════════════════════════════════════

                                                    HERO:

                                                    EYEBROW:
                                                    FOUNDING EXECUTIVE COHORT

                                                    H1:
                                                    Build a consultation system that converts— without changing your personality.

                                                    SUBHEAD:
                                                    Learn the exact structure that turns expertise into trust, trust into plans, and plans into consistent revenue.

                                                    PRICE:
                                                    Founder Pricing: $297 Next Cohort: $497

                                                    BUTTON:
                                                    ENROLL NOW→ https: //buy.stripe.com/5kQ00l0JAeLS4dgaUAfUQ02

                                                    SECONDARY:
                                                    Prefer to apply first ? →/apply

                                                    ───────────────────────────────────────────────────────────────────

                                                    OUTCOMES :
                                                    By the end, you will have: ✓A consultation framework you can repeat with any client✓ A treatment explanation structure that increases trust✓ Ingredient language that makes retail feel obvious✓ A script system that prevents discounting and doubt✓ A clean "executive delivery"
                                                    style clients respect

                                                    ───────────────────────────────────────────────────────────────────

                                                    WHAT 'S INCLUDED:•
                                                    4 sessions(live or recorded)• Workbook: frameworks + scripts• Implementation checklist• Templates: consultation flow + retail language• Q & A access

                                                    ───────────────────────────────────────────────────────────────────

                                                    GUARANTEE:
                                                    Simple guarantee: If you complete the implementation checklist and feel the system did not improve your clarity and confidence, email within 7 days of completion
                                                    for a refund.

                                                    ───────────────────────────────────────────────────────────────────

                                                    FAQ:

                                                    Q: Is this
                                                    for beginners ?
                                                    A : It 's for working professionals. If you already perform services and you want your words to match your skill, you'
                                                    re in the right place.

                                                    Q: Do I need to be good at sales ?
                                                    A : No.The entire point is to remove sales energy.Education + structure replaces selling.

                                                    Q: Is it technique training ?
                                                    A : No.This is communication architecture: consultation, authority, product education, and conversion language.

                                                    Q: How long do I have access ?
                                                        A : You decide.If you offer lifetime recordings, state it here.If not, state your access window clearly.

                                                    Q: Can I use this
                                                    for my team ?
                                                    A : Yes— owners can implement the system
                                                    for staff delivery.If you want team licensing, add an upgrade option.

                                                    ═══════════════════════════════════════════════════════════════════PAGE 4: CURRICULUM═══════════════════════════════════════════════════════════════════

                                                    HERO:
                                                    Curriculum

                                                    SUBHEAD:
                                                    A practical operating system you can use in real client conversations.

                                                    MODULE 01— Skin Architecture:
                                                    OUTCOME: Explain skin like an expert without sounding complicated.YOU 'LL BUILD: A "skin map" explanation script for your core client types.
                                                    KEY TOPICS: Barrier
                                                    function, inflammation patterns, dehydration vs dryness, pigment pathways, acne mechanics, sensitivity triggers.

                                                    MODULE 02— Treatment Communication:
                                                    OUTCOME: Clients understand your recommendations instantly.YOU 'LL BUILD: A treatment explanation format that removes confusion and hesitation.
                                                    KEY TOPICS: Framing results, timelines, what to expect, compliance language, aftercare explanation.

                                                    MODULE 03— Ingredient Authority:
                                                    OUTCOME: Retail becomes education, not sales.YOU 'LL BUILD: Ingredient explanation scripts for your top product categories.
                                                    KEY TOPICS: Actives vs support ingredients, contraindications, skin - type matching, simplifying complex science.

                                                    MODULE 04— Consultation Conversion:
                                                    OUTCOME: More yes, fewer maybes.YOU 'LL BUILD: A consultation structure that leads to a plan.
                                                    KEY TOPICS: Discovery flow, qualifying, pain - to - plan language, objection handling with calm authority.

                                                    MODULE 05— Retail Education Scripts:
                                                    OUTCOME: Clients buy product because it makes sense.YOU 'LL BUILD: Your retail close language and take-home plan format.
                                                    KEY TOPICS: Bundling by outcome, "why this now,"
                                                    routine sequencing, compliance anchoring.

                                                    CTA:
                                                    Want the full operating system ? →Join the Founding Cohort→ / founding - cohort

                                                    ═══════════════════════════════════════════════════════════════════ PAGE 5 : ABOUT═══════════════════════════════════════════════════════════════════

                                                    HERO:
                                                    About Ambitiously Institute

                                                    SUBHEAD:
                                                    Built from real education leadership and real client conversion systems.

                                                    FOUNDER STORY:
                                                    Conrad St.Denis

                                                    Ambitiously Institute was built from what works in the real world: consultation architecture, educator - level delivery, and the systems that drive consistent revenue without gimmicks.

                                                    I 've trained professionals, led education, and watched the same problem repeat: talent doesn'
                                                    t automatically convert.Structure converts.

                                                    This institute exists to make your expertise speak clearly— so the right clients trust you, follow your plans, and invest without resistance.

                                                    PRINCIPLES:

                                                    Authority without arrogance:
                                                    Clean delivery.No pressure.No performance.

                                                    Structure over hustle:
                                                    Systems beat motivation.Every time.

                                                    Education closes:
                                                    Clients buy when they understand.

                                                    CTA:
                                                    If you want your career to feel controlled again— start here.→Apply Now→ / apply

                                                    ═══════════════════════════════════════════════════════════════════ PAGE 6: APPLY / CONTACT═══════════════════════════════════════════════════════════════════

                                                    HERO:
                                                    Apply / Contact

                                                    SUBHEAD:
                                                    If you want to join the cohort, collaborate, or bring this system into a team— send your details below.

                                                    FORM FIELDS: •Full Name(required)• Email(required)• Phone(optional)• City / Province(optional)• Role(dropdown): Solo Professional | Team Member | Owner | Educator• Primary Goal(dropdown): Raise prices | Close more plans | Sell more retail | Improve delivery | Train team• Biggest challenge(long text)• Link to Instagram / Website(optional)

                                                    SUBMIT BUTTON:
                                                    SUBMIT APPLICATION

                                                    SUCCESS MESSAGE:
                                                    Application received.You 'll get a reply within 48 hours.

                                                    ═══════════════════════════════════════════════════════════════════
                                                    SKIN ASSESSMENT QUIZ Wix Form Configuration═══════════════════════════════════════════════════════════════════

                                                    PAGE URL: /skin-assessment
                                                    SUCCESS PAGE: /ski-success

                                                    FORM FIELDS(in order):

                                                    1. Short Text→ Full Name→ Required 2. Email→ Email Address→ Required 3. Dropdown→ Skin Type→ Required Options: Normal, Oily, Dry, Combination, Sensitive

                                                    4. Checkboxes→ Primary Concerns→ Required Options: Acne / Breakouts, Fine Lines / Wrinkles, Hyperpigmentation, Redness / Rosacea, Dehydration, Uneven Texture, Large Pores, Dark Circles

                                                    5. Dropdown→ Current Routine→ Required Options: Minimal(1 - 2 products), Moderate(3 - 5 products), Complex(6 + products), None

                                                    6. Slider→ Sleep Quality(1 - 10)→ Required(1 - 10 scale) 7. Slider→ Stress Level(1 - 10)→ Required(1 - 10 scale)

                                                    8. Dropdown→ Climate→ Required Options: Dry, Humid, Temperate, Cold, Hot

                                                    9. Checkboxes→ Current Treatments→ Optional Options: Professional facials, Chemical peels, Microneedling, Laser treatments, Prescription retinoids, Over - the - counter retinol, None

                                                    10. Long Text→ Allergies or Sensitivities→ Optional 11. Dropdown→ Are you pregnant or nursing ? →Required Options : Yes, No

                                                    12. Dropdown→ Primary Goal→ Required Options: Clear acne / blemishes, Reduce fine lines / wrinkles, Even skin tone, Deep hydration, Minimize pores, Overall radiance

                                                    13. Dropdown→ Budget Range→ Required Options: $50 - 100, $100 - 200, $200 - 300, $300 +

                                                    14. Dropdown→ Texture Preference→ Required Options: Lightweight / Gel, Rich / Creamy, No preference

                                                    15. Long Text→ Custom Requests or Notes→ Optional

                                                    16. File Upload→ Front Face Photo→ Required(Max 10 MB, JPG / PNG) 17. File Upload→ Left Profile Photo→ Required(Max 10 MB) 18. File Upload→ Right Profile or Décolleté Photo→ Required(Max 10 MB)

                                                    FORM SETTINGS: •Submit Button Text: SUBMIT FOR REVIEW• Success Message: Thank you, { { Full Name } }!Your SKI assessment has been received.Conrad will personally review your photos and profile within 24 - 48 hours.You 'll receive your custom formulation via email.•
                                                    Email Notification To: conrad @ambitiouslyinstitute.com• Email Subject: 🆕SKI ASSESSMENT: { { Full Name } }• Reply - to: { { Email Address } }• Redirect: /ski-success

                                                    HEADER TEXT(above form):
                                                    Title: SKI PERSONALIZED ASSESSMENT(Cormorant Garamond, 48 px, #0B0B0D, center)
Subtitle: Complete your profile for a custom skincare formulation designed for your unique skin. (Jost, 18px, # 666, center)

                                                    PHOTO TIPS(below form): 📸PHOTO TIPS FOR BEST RESULTS: •Take photos in natural daylight• Remove all makeup and skincare• Pull hair back completely• Face camera directly
                                                    for front photo• Turn head 45°
                                                    for profile shots

                                                    ═══════════════════════════════════════════════════════════════════ EMAIL TEMPLATES═══════════════════════════════════════════════════════════════════

                                                    TEMPLATE 1: CUSTOMER FORMULATION RESPONSE─────────────────────────────────────────────────────────────────── Subject: Your Custom SKI Formulation is Ready—[Customer Name]

                                                    Hi[Name],

                                                    I 've reviewed your SKI assessment and photos. Here'
                                                    s your custom formulation:

                                                    ═══════════════════════════════════════════════════

                                                    YOUR SKIN PROFILE Skin Type: [Their answer] Primary Concerns: [Their answers] Recommended Focus: [Your analysis]

                                                    ═══════════════════════════════════════════════════

                                                    YOUR CUSTOM FORMULA

                                                    Base: [e.g., Lightweight Gel Moisturizer]

                                                    Active Ingredients: •[Ingredient][Percentage]—[Benefit]•[Ingredient][Percentage]—[Benefit]•[Ingredient][Percentage]—[Benefit]

                                                    Supporting Ingredients: •[Ingredient]—[Benefit]•[Ingredient]—[Benefit]

                                                    Texture: [Lightweight gel / Rich cream / Serum] Size: 50 ml Usage: [AM and PM after cleansing / As directed]

                                                    ═══════════════════════════════════════════════════

                                                    INVESTMENT: $[Price]

                                                    ═══════════════════════════════════════════════════

                                                    TO ORDER: https: //buy.stripe.com/7sY7sNeAqfPW6lo8MsfUQ05

                                                    Your formula will be compounded fresh and shipped within 3 - 5 business days.You 'll receive tracking via email.

                                                    Questions ? Reply to this email.

                                                    Conrad St.Denis Founder, Ambitiously Institute Ambitiously Institute[Website] | [Instagram]

                                                    ───────────────────────────────────────────────────────────────────

                                                    TEMPLATE 2 : LAB ORDER EMAIL─────────────────────────────────────────────────────────────────── Subject: NEW SKI ORDER— #[Order Number]

                                                    Customer: [Name] Email: [Customer Email] Shipping Address: [Full Address]

                                                    FORMULA SPECIFICATIONS:
                                                    Base: [e.g., Lightweight Gel] Batch Size: 50 ml Quantity: 1

                                                    INGREDIENTS: •[Ingredient][Percentage]•[Ingredient][Percentage]•[Ingredient][Percentage]•[Preservative system]

                                                    Packaging: [Amber glass pump / Airless pump / Jar] Label: Custom SKI label + customer name

                                                    SPECIAL INSTRUCTIONS: [Any notes]

                                                    SHIP TO: [Customer Name]
                                                    [Address]
                                                    [City, State ZIP]

                                                    Order Date: [Date] Required Ship Date: [Date + 3 days]

                                                    Confirm receipt.

                                                    ───────────────────────────────────────────────────────────────────

                                                    TEMPLATE 3: SHIPPING CONFIRMATION TO CUSTOMER─────────────────────────────────────────────────────────────────── Subject: Your SKI Formula Has Shipped— Tracking Inside

                                                    Hi[Name],

                                                    Great news!Your custom SKI formulation has been compounded and shipped.

                                                    TRACKING NUMBER: [Number] CARRIER: [USPS / FedEx / UPS] ESTIMATED DELIVERY: [Date]

                                                    YOUR FORMULA: [Repeat formula summary]

                                                    USAGE INSTRUCTIONS: [Specific directions]

                                                    Questions ? Reply to this email.

                                                    Conrad

                                                    ═══════════════════════════════════════════════════════════════════ SOCIAL MEDIA ANNOUNCEMENTS═══════════════════════════════════════════════════════════════════

                                                    INSTAGRAM FEED POST───────────────────────────────────────────────────────────────────🧬 INTRODUCING : SKI Personalized Skin Assessment

                                                    Most skincare tells you what to buy.We ask what your skin actually needs.

                                                    The SKI Assessment is now live.

                                                    Here 's how it works:📸
                                                    Upload 3 photos of your skin📝 Complete your lifestyle + history profile🧪 Conrad reviews and designs your custom formulation✉️ You receive your personalized product recommendation within 48 hours

                                                    No guesswork.No generic routines.Just your skin + expert analysis = products that actually work
                                                    for you.

                                                    🔗Link in bio to start your assessment

                                                    #customskincare #skincareconsultation #esthetician #skincareexpert #personalskincare #skincareroutine #skincarescience #ambitiouslyinstitute

                                                    ───────────────────────────────────────────────────────────────────

                                                    INSTAGRAM STORIES(3 slides)───────────────────────────────────────────────────────────────────

                                                    SLIDE 1: [Photo of you analyzing skin or product flat lay] Text: NEW: SKI Personalized Assessment Swipe up→ Link in bio

                                                    SLIDE 2:
                                                    Text: 3 Photos + 5 Minutes = Your Custom Formula✓ Skin type analysis✓ Lifestyle factors✓ Treatment history✓ Custom ingredient selection Real expertise.Real customization.

                                                    SLIDE 3:
                                                    Text: Limited: Conrad reviews each assessment personally First 10 assessments get priority formulation Link in bio→ Start now

                                                    ───────────────────────────────────────────────────────────────────

                                                    LINKEDIN POST─────────────────────────────────────────────────────────────────── I just launched something I 've been developing for months.

                                                    Most skincare brands sell you products based on marketing categories: "anti-aging,"
                                                    "acne-prone,"
                                                    "sensitive."

                                                    But your skin isn 't a category. It'
                                                    s a unique ecosystem of biology, lifestyle, and history.

                                                    That 's why I built the SKI Personalized Assessment.

                                                    It 's a comprehensive skin analysis that considers:→
                                                    Your actual skin(via photo analysis)→ Your daily habits and environment→ Your treatment history and sensitivities→ Your specific goals and preferences

                                                    Not an algorithm.Not a quiz that spits out generic recommendations.

                                                    Every assessment is reviewed personally.Every formulation is custom - designed.

                                                    Because "good for your skin type"
                                                    isn 't good enough.

                                                    Link in comments
                                                    if you want to see what truly personalized skincare looks like.

                                                    #skincare #esthetician #customformulation #skincarescience #entrepreneur

                                                    ───────────────────────────────────────────────────────────────────

                                                    EMAIL TO LIST─────────────────────────────────────────────────────────────────── Subject: Your skin is not a skin "type"(new assessment)

                                                    [First Name],

                                                    I 've spent 18 years in skincare education, and I'
                                                    ve noticed something:

                                                    The industry wants to put you in a box.

                                                    Oily.Dry.Combination.Sensitive.

                                                    But your skin isn 't a category. It'
                                                    s a living, changing ecosystem influenced by your sleep, stress, climate, hormones, and history.

                                                    That 's why I built the SKI Personalized Assessment.

                                                    It 's not a quiz that spits out generic product recommendations.

                                                    It 's a comprehensive analysis where I personally review:•
                                                    Your photos(front + profiles)• Your lifestyle and environment• Your treatment history• Your specific goals

                                                    Then I design a custom formulation
                                                    for your unique skin.

                                                    No algorithms.No marketing categories.Just expertise applied to your actual skin.

                                                    Start your assessment here: [LINK]

                                                    Conrad St.Denis Founder, Ambitiously Institute

                                                    P.S.I 'm reviewing the first 10 assessments personally. After that, pricing increases. If you'
                                                    ve been waiting
                                                    for truly personalized skincare, this is it.

                                                    ═══════════════════════════════════════════════════════════════════DAILY OPERATIONAL WORKFLOW═══════════════════════════════════════════════════════════════════

                                                    STEP 1: CUSTOMER SUBMITS FORM• Customer visits / skin - assessment• Fills out 18 - field form• Uploads 3 photos• Submits

                                                    SYSTEM ACTION: •Form data emailed to conrad @ambitiouslyinstitute.com• Customer redirected to / ski - success• Customer sees confirmation message

                                                    ───────────────────────────────────────────────────────────────────

                                                    STEP 2: YOU REVIEW(Within 24 - 48 hours)• Check email
                                                    for "🆕 SKI ASSESSMENT"
                                                    notification• Download 3 photos from email attachments• Review form answers• Analyze skin needs based on photos + history• Determine formula(base + actives + percentages)• Set price based on complexity

                                                    PRICING GUIDE: •Simple(1 - 2 actives): $85 - 120• Standard(3 - 4 actives): $120 - 180• Complex(5 + actives): $180 - 250

                                                    ───────────────────────────────────────────────────────────────────

                                                    STEP 3: SEND CUSTOMER EMAIL• Use Template 1(Customer Formulation Response)• Fill in [brackets] with their data• Include Stripe payment link• Send

                                                    ───────────────────────────────────────────────────────────────────

                                                    STEP 4: CUSTOMER PAYS• Customer clicks Stripe link• Completes payment• You receive Stripe notification• Customer sees / formula - ordered confirmation

                                                    ───────────────────────────────────────────────────────────────────

                                                    STEP 5: ORDER FROM LAB• Use Template 2(Lab Order Email)• Send to your lab / production partner• Include all formula specifications• Request 3 - 5 day turnaround

                                                    ───────────────────────────────────────────────────────────────────

                                                    STEP 6: FULFILLMENT• Lab compounds formula• Lab ships to customer• Lab provides tracking(or you request it)• You forward tracking to customer using Template 3

                                                    ───────────────────────────────────────────────────────────────────

                                                    STEP 7: FOLLOW - UP(1 week after delivery)• Email customer: How is the formula working ? •Request testimonial / photo
                                                    if satisfied• Address any concerns
                                                    if issues

                                                    ═══════════════════════════════════════════════════════════════════

                                                    ═══════════════════════════════════════════════════════════════════ TROUBLESHOOTING & CHECKLISTS═══════════════════════════════════════════════════════════════════

                                                    PRE - LAUNCH CHECKLIST□ Wix site has all 6 main pages built□ / skin - assessment page created with form□ / ski - success page created□ / formula - ordered page created□ Stripe payment links tested($1 test, then refund)□ Form submits to correct email□ Navigation menu includes Skin Assessment□ Mobile version looks clean□ All buttons link to correct pages

                                                    POST - LAUNCH CHECKLIST□ Test complete flow with fake data□ Check email notifications arrive□ Verify photo attachments download correctly□ Test Stripe payment link□ Confirm redirect to / formula - ordered works□ Post Instagram announcement□ Post LinkedIn announcement□ Send email to list(
                                                        if applicable)

                                                    TROUBLESHOOTING

                                                    Problem : Form not sending emails Solution: Check Wix Forms settings→ Email notifications→ Verify email address

                                                    Problem: Stripe link not working Solution: Check
                                                    if link is active in Stripe Dashboard→ Payment Links→ Ensure "Active"
                                                    is toggled on

                                                    Problem: Photos not attaching to email Solution: Wix Forms has 15 MB limit per email.If 3 photos exceed this, use Wix File Upload with Google Drive integration instead.

                                                    Problem: Success page not showing Solution: Check redirect URL in form settings.Must be exact: /ski-success (not ski-success or /ski - success / )

                                                Problem: Mobile layout broken Solution: Wix Editor→ Mobile view→ Adjust spacing and font sizes

                                                ═══════════════════════════════════════════════════════════════════

                                                Field # Type Label Required ? Settings 1 Short Text Full Name✅ -
                                                2 Email Email Address✅ -
                                                3 Dropdown Skin Type✅ Options : Normal, Oily, Dry, Combination, Sensitive 4 Checkboxes Primary Concerns✅ Options: Acne / Breakouts, Fine Lines / Wrinkles, Hyperpigmentation, Redness / Rosacea, Dehydration, Uneven Texture, Large Pores, Dark Circles 5 Dropdown Current Routine✅ Options: Minimal(1 - 2 products), Moderate(3 - 5 products), Complex(6 + products), None 6 Slider Sleep Quality(1 - 10)✅ Min 1, Max 10 7 Slider Stress Level(1 - 10)✅ Min 1, Max 10 8 Dropdown Climate✅ Options: Dry, Humid, Temperate, Cold, Hot 9 Checkboxes Current Treatments❌ Options: Professional facials, Chemical peels, Microneedling, Laser treatments, Prescription retinoids, Over - the - counter retinol, None 10 Long Text Allergies or Sensitivities❌ -
                                                11 Dropdown Are you pregnant or nursing ? ✅Options : Yes, No 12 Dropdown Primary Goal✅ Options: Clear acne / blemishes, Reduce fine lines / wrinkles, Even skin tone, Deep hydration, Minimize pores, Overall radiance 13 Dropdown Budget Range✅ Options: $50 - 100, $100 - 200, $200 - 300, $300 +
                                                14 Dropdown Texture Preference✅ Options: Lightweight / Gel, Rich / Creamy, No preference 15 Long Text Custom Requests or Notes❌ -
                                                16 File Upload Front Face Photo✅ Max 10 MB 17 File Upload Left Profile Photo✅ Max 10 MB 18 File Upload Right Profile or Décolleté Photo✅ Max 10 MB