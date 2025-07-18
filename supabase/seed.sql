-- Seed data for Sharp Digital website
-- This file populates the database with the current fallback content

-- Clear existing data
TRUNCATE blog_posts, services, team_members CASCADE;

-- Insert blog posts (converted from fallback content)
INSERT INTO blog_posts (id, title, slug, excerpt, content, author, publish_date, tags) VALUES
(
  '550e8400-e29b-41d4-a716-446655440001'::uuid,
  'AI Strategy Implementation Guide',
  'ai-strategy-implementation-guide',
  'A comprehensive guide to implementing AI strategies in your digital transformation journey with proven methodologies.',
  '# AI Strategy Implementation Guide

Digital transformation is no longer optional—it''s essential for business survival and growth. In this comprehensive guide, we''ll explore proven methodologies for implementing AI strategies that drive real business value.

## Understanding Your Business Objectives

The key to successful AI implementation lies in understanding your business objectives first, then identifying the right AI technologies to achieve those goals. We''ll cover everything from data preparation to model deployment and ongoing optimization.

## Our Proven Framework

Our proven framework has helped dozens of companies successfully integrate AI into their operations, resulting in:

- Increased efficiency
- Better customer experiences  
- Significant cost savings

## Getting Started

Start by assessing your current data infrastructure and identifying clear use cases where AI can provide measurable business impact.',
  'Loreen',
  '2024-03-15T10:00:00Z',
  ARRAY['AI', 'Digital Transformation', 'Strategy']
),
(
  '550e8400-e29b-41d4-a716-446655440002'::uuid,
  'Customer Experience Optimization',
  'customer-experience-optimization',
  'How to optimize customer touchpoints for exceptional journeys through strategic digital transformation.',
  '# Customer Experience Optimization

Customer experience optimization is at the heart of successful digital transformation. Today''s customers expect seamless, personalized interactions across all touchpoints.

## Mapping Customer Journeys

We''ll explore proven strategies for mapping customer journeys, identifying pain points, and implementing digital solutions that enhance every interaction. From initial awareness to post-purchase support, every touchpoint is an opportunity to create value.

## Our Approach

Our approach combines:

- Data analytics
- User research  
- Cutting-edge technology

This creates experiences that not only meet but exceed customer expectations.

## Key Benefits

- Improved customer satisfaction
- Increased loyalty and retention
- Higher conversion rates
- Better brand perception',
  'Janos',
  '2024-03-10T10:00:00Z',
  ARRAY['Customer Experience', 'UX', 'Digital Transformation']
),
(
  '550e8400-e29b-41d4-a716-446655440003'::uuid,
  'Data-Driven Decision Making',
  'data-driven-decision-making',
  'Transform your data into actionable business intelligence with advanced analytics and visualization tools.',
  '# Data-Driven Decision Making

In today''s data-rich environment, the ability to make informed decisions quickly is a competitive advantage. Data-driven decision making transforms raw information into strategic insights.

## Building Robust Data Pipelines

We''ll explore how to build robust data pipelines, implement advanced analytics, and create compelling visualizations that tell your data''s story. From predictive modeling to real-time dashboards, we''ll cover the tools and techniques that turn data into your most valuable asset.

## Our Methodology

Our methodology helps organizations move from intuition-based to evidence-based decision making, resulting in:

- Better outcomes
- Reduced risk
- Improved operational efficiency
- Strategic competitive advantage

## Key Components

- Data strategy development
- Analytics implementation
- Dashboard creation
- Team training and enablement',
  'Loreen',
  '2024-03-05T10:00:00Z',
  ARRAY['Data Analytics', 'Business Intelligence', 'Decision Making']
);

-- Insert services (converted from fallback content)
INSERT INTO services (id, title, slug, description, content, features, icon, color, order_index) VALUES
(
  '660e8400-e29b-41d4-a716-446655440001'::uuid,
  'Customer Experience',
  'customer-experience',
  'Optimize every touchpoint for exceptional customer journeys through digital transformation, user journey mapping, and personalization strategies.',
  '# Customer Experience Transformation

Customer experience transformation is about creating seamless, personalized interactions that delight customers at every touchpoint. We help organizations map their customer journeys, identify pain points, and implement digital solutions that enhance satisfaction and loyalty.

## Our Approach

Our comprehensive approach includes:

- **User Research**: Deep understanding of customer needs and behaviors
- **Journey Mapping**: Visualizing the complete customer experience
- **Touchpoint Optimization**: Enhancing every interaction point
- **Personalization Technologies**: Implementing AI-driven personalization

## Outcomes

We work with you to create experiences that not only meet but exceed customer expectations, resulting in:

- Increased customer satisfaction scores
- Higher retention rates
- Improved brand loyalty
- Better customer lifetime value',
  ARRAY['Journey Mapping', 'Touchpoint Optimization', 'Personalization'],
  'customer-experience',
  'orange-sharp',
  1
),
(
  '660e8400-e29b-41d4-a716-446655440002'::uuid,
  'Operational Efficiency',
  'operational-efficiency',
  'Streamline processes through intelligent automation, workflow optimization, and digital tool integration to improve efficiency.',
  '# Operational Efficiency Transformation

Operational efficiency transformation focuses on streamlining processes, eliminating waste, and leveraging technology to maximize productivity. We help organizations identify bottlenecks, implement automation solutions, and optimize workflows for peak performance.

## Our Methodology

Our proven methodology includes:

- **Process Analysis**: Comprehensive review of current operations
- **Automation Implementation**: Smart automation for repetitive tasks
- **Workflow Optimization**: Redesigning processes for efficiency
- **Change Management**: Ensuring sustainable adoption

## Key Benefits

- Reduced operational costs
- Faster process execution
- Improved accuracy and quality
- Enhanced employee satisfaction
- Better resource utilization',
  ARRAY['Process Automation', 'Workflow Optimization', 'Digital Tools'],
  'operational-efficiency',
  'sky-sharp',
  2
),
(
  '660e8400-e29b-41d4-a716-446655440003'::uuid,
  'Data & Analytics',
  'data-and-analytics',
  'Transform data into actionable business intelligence through BI dashboards, predictive analytics, and data visualization.',
  '# Data & Analytics Transformation

Data and analytics transformation enables organizations to make informed decisions based on insights rather than intuition. We help businesses build robust data pipelines, implement advanced analytics, and create compelling visualizations that drive strategic decision-making.

## Our Approach

Our comprehensive data strategy includes:

- **Data Strategy Development**: Aligning data initiatives with business goals
- **Analytics Implementation**: Advanced analytics and machine learning
- **Dashboard Creation**: Interactive business intelligence dashboards
- **Team Training**: Enabling your team to leverage data effectively

## Delivered Value

- Real-time business insights
- Predictive analytics capabilities
- Data-driven decision making
- Competitive advantage through analytics
- Improved ROI on data investments',
  ARRAY['BI Dashboards', 'Predictive Analytics', 'Data Visualization'],
  'data-analytics',
  'purple-sharp',
  3
);

-- Insert team members (converted from fallback content)
INSERT INTO team_members (id, name, role, bio, linkedin_url, email) VALUES
(
  '770e8400-e29b-41d4-a716-446655440001'::uuid,
  'Loreen',
  'Digital Transformation Strategist',
  '# About Loreen

Loreen is a seasoned digital transformation expert with over 10 years of experience helping organizations navigate their digital evolution. She specializes in AI strategy implementation and data-driven decision making.

## Expertise

- AI Strategy & Implementation
- Digital Transformation Leadership
- Data Analytics & Business Intelligence
- Change Management
- Strategic Planning

Loreen has successfully led digital transformation initiatives for companies ranging from startups to Fortune 500 enterprises, consistently delivering measurable business results.',
  'https://linkedin.com/in/loreen',
  'loreen@sharp.com'
),
(
  '770e8400-e29b-41d4-a716-446655440002'::uuid,
  'Janos',
  'Customer Experience Lead',
  '# About Janos

Janos brings deep expertise in customer experience optimization and user research. With a background in both technology and psychology, he helps organizations create truly user-centered digital experiences.

## Expertise

- Customer Experience Design
- User Research & Testing
- Journey Mapping
- Personalization Strategies
- UX/UI Optimization

Janos has a unique ability to combine data-driven insights with human psychology to create experiences that resonate with users and drive business results.',
  'https://linkedin.com/in/janos',
  'janos@sharp.com'
);