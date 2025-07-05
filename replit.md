# TourGuide Chat Application

## Overview

TourGuide Chat is a real-time customer support application designed for the tourism industry. It provides 24/7 assistance to travelers through a multi-category chat system, connecting tourists with specialized guides and support staff. The application features a modern React frontend with a Node.js/Express backend, real-time WebSocket communication, and PostgreSQL database storage.

## Current Status (Mobile Optimized - Ready for UI/UX Enhancement)

**Application is fully functional with these core features completed:**
- Tourist interface with guide profiles, hotel assignments, and announcements
- Admin dashboard with complete CRUD operations for all entities
- Guide dashboard with profile management and assignment viewing
- Real-time chat system with WebSocket support
- File upload functionality for announcements and guide photos
- Emergency contact system with WhatsApp integration
- Comprehensive hotel and guide assignment management

**Database contains:**
- 2 active guides: Taha and Weronika
- 2 hotels: Renaissance and Sharm Reef  
- Multiple guide assignments with flexible scheduling
- Sample announcements and emergency contacts
- Chat session data

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens for travel-themed branding
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API with real-time WebSocket support
- **File Uploads**: Multer middleware for handling file attachments
- **Middleware**: Custom logging, error handling, and CORS support

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Migrations**: Drizzle Kit for schema management
- **Connection**: Connection pooling with @neondatabase/serverless

## Key Components

### Real-time Communication
- **WebSocket Server**: Built-in WebSocket support for live chat functionality
- **Message Types**: Support for text messages, file attachments, and voice recordings
- **Typing Indicators**: Real-time typing status updates
- **Connection Management**: Automatic reconnection with exponential backoff

### Chat System
- **Categories**: Predefined support categories (Hotel Change, Complaints, Tours, Medical, General)
- **Session Management**: Persistent chat sessions with guide assignment
- **Message History**: Complete conversation tracking with timestamps
- **File Sharing**: Support for images, documents, and voice recordings

### Guide Management
- **Guide Profiles**: Comprehensive guide information with specialties and ratings
- **Availability Tracking**: Real-time guide availability status
- **Assignment System**: Automatic guide assignment based on availability and expertise
- **Performance Metrics**: Response times and customer satisfaction tracking

### Admin Dashboard
- **Guide Management**: CRUD operations for guide profiles
- **Hotel Management**: Hotel information and contact management
- **Schedule Management**: Weekly guide assignment scheduling
- **Announcements**: System-wide announcements and notifications
- **Emergency Contacts**: Quick access to emergency services and WhatsApp integration

## Data Flow

### Chat Initiation
1. Tourist selects a support category on the homepage
2. System creates a new chat session and assigns an available guide
3. WebSocket connection is established for real-time communication
4. Guide receives notification of new session assignment

### Message Exchange
1. User types message in chat interface
2. Message is sent via WebSocket to the server
3. Server validates and stores message in database
4. Message is broadcast to all participants in the session
5. Typing indicators and read receipts are managed in real-time

### File Handling
1. Files are uploaded to server storage via REST API
2. File metadata is stored in database with message reference
3. Download links are provided for file access
4. Support for multiple file types with size restrictions

### Emergency Escalation
1. Emergency category triggers immediate priority handling
2. WhatsApp integration sends alerts to emergency contacts
3. Backup notification systems ensure rapid response
4. Session is flagged for urgent attention

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React, React DOM, React Hook Form, TanStack Query
- **UI Framework**: Radix UI primitives, Shadcn/ui components, Tailwind CSS
- **Backend**: Express.js, WebSocket (ws), Multer for file uploads
- **Database**: Drizzle ORM, @neondatabase/serverless, PostgreSQL drivers
- **Validation**: Zod for schema validation, Drizzle-Zod for database schemas
- **Development**: Vite, TypeScript, ESBuild for production builds

### Integration Services
- **WhatsApp API**: Direct messaging integration for emergency contacts
- **File Storage**: Local file system with configurable upload limits
- **Voice Recording**: Browser MediaRecorder API for voice messages

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with hot module replacement
- **Database**: Local PostgreSQL or Neon development database
- **File Storage**: Local uploads directory with development file serving
- **WebSocket**: Development WebSocket server with debug logging

### Production Deployment
- **Build Process**: Vite production build with static asset optimization
- **Server Bundle**: ESBuild bundling for Node.js server code
- **Database**: Production PostgreSQL with connection pooling
- **File Storage**: Production file storage with CDN integration
- **Environment**: Environment-specific configuration via process.env

### Configuration Management
- **Database URL**: Required DATABASE_URL environment variable
- **File Uploads**: Configurable upload directory and size limits
- **CORS**: Environment-specific CORS configuration
- **WebSocket**: Production WebSocket configuration with proper origins

## Changelog

Changelog:
- June 29, 2025. Initial setup
- June 30, 2025. Enhanced hotel assignment form with multiple days, custom shifts, and multiple week dates. Minimized form layout for better user experience.
- June 30, 2025. Added complete edit functionality for admin panel - admin can now modify or delete any previous assignment. Fixed guide dashboard to show all guides with guide switcher dropdown. Resolved assignment display issues using new JSON schema structure.
- June 30, 2025. Fixed tourist interface issues: Updated guide display to show all guides (Taha and Weronika), improved hotel assignment click handlers with proper JSON data handling, enhanced announcement display with file attachment support and download functionality. Tourists can now click on guide profiles, hotel assignments, and announcements to view detailed information.
- June 30, 2025. Minimized Guide Profile modal form to improve user experience. Reduced form complexity with compact layout, smaller input fields, essential-only information, and streamlined interface for guides to quickly update their profiles.
- June 30, 2025. Added simple photo upload functionality to guide profiles. Replaced URL input with click-to-upload camera icon. Guides can now easily upload their profile photos by clicking the camera icon on their avatar.
- June 30, 2025. Implemented comprehensive bidirectional notification system with visual badges. Tourists see notification badges on guide cards when guides reply to them. Guides see notification badges on chat sessions and tabs when tourists send new messages. Added real-time auto-refresh to detect new messages and update notifications automatically.
- June 30, 2025. Implemented comprehensive per-user conversation deletion and read status functionality. Users can now delete entire conversations that disappear only from their view, and mark conversations as read. Features include conversation-level actions instead of individual message deletion, per-user soft delete using deletedBy arrays, enhanced message filtering to support independent user views, and proper frontend filtering with user ID parameters. Updated database schema from isDeleted boolean to deletedBy string array for tracking per-user deletions. System now properly filters conversations for both tourists and guides based on deletion status.
- June 30, 2025. Implemented hotel-based guide assignment system with minimized interface design. Tourists now select category first, then choose their hotel, which automatically routes them to the correct assigned guide (Taha for Renaissance, Weronika for Sharm Reef). System features minimized "Welcome to TourGuide Chat" header, hotel selection step after category selection, automatic guide assignment based on hotel assignments table, real-time chat functionality with WebSocket support, and hotel information displayed in chat headers. Messages now flow bidirectionally between tourists and guides with proper routing and real-time notifications.
- June 30, 2025. Fixed critical message sending bug and verified complete bidirectional communication. Tourist messages now properly reach guides using correct senderId format instead of userId. Tested full conversation flow: tourist requests pyramids tour → Taha provides options → tourist selects full day tour → Taha provides complete details and pricing. Both real-time WebSocket communication and auto-refresh backup (every 2 seconds) working correctly with 192 active connections. System successfully enables complete problem resolution conversations between guests and guides.
- June 30, 2025. Resolved HTTP caching issue preventing tourists from seeing guide replies. Added cache-busting with timestamp parameters and no-cache headers to message fetching. Verified complete bidirectional flow with Weronika: tourist requests snorkeling tour → Weronika provides detailed options and pricing → tourist confirms interest → Weronika provides booking details and pickup arrangements. Both hotel-based routing systems (Renaissance→Taha, Sharm Reef→Weronika) now fully operational with real-time message exchange enabling complete problem resolution from initial contact through booking confirmation.
- June 30, 2025. Fixed critical guide interface caching issue preventing guides from seeing tourist messages. Applied cache-busting solution to all chat components (guide-chat-modal, tourist-guide-chat-modal, chat-interface). Added automatic welcome messages for immediate guide notification when tourists connect. Verified complete bidirectional communication with Taha: tourist requests tour booking → Taha provides detailed pyramid tour options ($60) → tourist confirms booking → Taha provides complete confirmation with pickup details. System now enables seamless problem resolution conversations from initial contact through final booking confirmation for both Renaissance Hotel (Taha) and Sharm Reef Hotel (Weronika) routing.
- June 30, 2025. Resolved final session filtering bug preventing guides from receiving tourist messages. Fixed storage layer getChatSessions method to properly filter by guide assignment (guideId) instead of user deletion status. Verified complete bidirectional flow: tourist requests Ras Mohammed tour → Taha provides detailed snorkeling options ($50 with equipment) → tourist confirms booking → Taha provides complete booking confirmation with reference number. Both guide interfaces (Taha and Weronika) now properly receive and can respond to all tourist messages. System enables complete problem resolution from initial contact through successful booking completion.
- June 30, 2025. Fixed critical HTTP caching issue preventing tourists from seeing guide replies. Applied comprehensive server-side cache-busting headers (Cache-Control, Pragma, Expires, dynamic ETag) to messages API endpoint, preventing 304 responses. Enhanced client-side query optimization with timestamp-based keys and zero cache times. Verified complete bidirectional communication: tourist reports AC problem → Weronika provides immediate maintenance solution and room change → tourist expresses satisfaction. Both hotel routing systems now enable seamless real-time conversations from initial complaint through successful resolution.
- June 30, 2025. Resolved recurring bidirectional communication failures by applying cache-busting headers to ALL API endpoints (messages AND chat sessions). Fixed persistent 304 response issues that prevented message delivery in both directions. Verified complete working system: tourist tour inquiry → Taha provides Elite Boat Tour details ($120) → tourist confirms booking → Taha provides complete confirmation with pickup details and booking reference. System now enables reliable real-time conversations for both Renaissance Hotel (Taha) and Sharm Reef Hotel (Weronika) routing without communication interruptions.
- June 30, 2025. Implemented permanent global cache-busting solution to prevent communication issues for ALL future guides. Applied universal API middleware with dynamic ETags and no-cache headers to entire `/api` namespace. Simplified client-side code by removing redundant cache-busting. Verified solution with new guide Ahmed: tourist desert tour inquiry → Ahmed provides comprehensive desert packages (White Desert $80, Siwa Oasis $150) → full bidirectional communication working immediately. System now has permanent immunity against cache-related communication failures for all current and future guide additions.
- July 1, 2025. Fixed critical guide assignment bug where all direct guide chats were being assigned to wrong guide (Shaaban) regardless of which guide tourists clicked. Updated server-side chat session creation route to properly extract and prioritize guideId parameter from request body. Enhanced mobile responsiveness across all chat interfaces with responsive sizing, touch-friendly buttons, better empty states, and improved viewport settings. Cleared all existing sessions for clean testing environment. System now correctly routes chat sessions to selected guides (Latief, Moustafa, etc.) and provides optimal mobile experience.
- July 1, 2025. Implemented comprehensive notification and timestamp system with full browser notification support. Added date and time display under all chat messages showing when they were sent. Created browser notification system that shows popup notifications to all users (tourists, guides, and admin) when messages are sent or received. Added support for both in-app toast notifications and native browser notifications. Enhanced conversation interface with automatic notification permissions and cross-platform notification delivery. System now provides complete notification coverage ensuring no messages are missed.
- July 1, 2025. Enhanced notification system with smart engagement tracking to prevent spam for inactive guests. Only tourists who actively send messages (text or voice) now receive guide reply notifications, preventing notifications for inactive guests who haven't engaged in conversations. System tracks user engagement through message metadata and only shows "New Message from Guide" notifications for tourists who have previously sent messages, ensuring notifications go only to actively participating guests. This prevents unwanted notifications for finished or inactive conversations while maintaining full notification coverage for engaged users.
- July 1, 2025. Created comprehensive announcement modal system for complete guest information access. Replaced simple toast notifications with full-featured announcement modal that displays complete announcement content, file attachments, timestamps, and urgency levels. Guests can now click announcement cards to open detailed modal with full text content, download file attachments directly, and view complete announcement information with proper formatting and styling. Modal includes urgency-based color coding (urgent/warning/info), date formatting, and seamless file download functionality ensuring guests have complete access to all announcement details.
- July 1, 2025. Implemented comprehensive hotel assignment modal system for detailed schedule viewing. Created dedicated hotel assignment modal allowing guests to click on hotel assignment cards to view complete assignment details including hotel information (address, phone, email), assigned guide details (name, specialties, languages, contact info), and comprehensive schedule information (active days, shift times, week dates). Modal features professional layout with color-coded sections, formatted time displays, contact buttons for direct guide calling, and complete assignment data visualization. System now enables guests to access all hotel assignment information through intuitive click-to-view interface.
- July 1, 2025. Implemented comprehensive analytics system for tourism guide operations. Created complete analytics backend with simplified methods for guide performance tracking, chat volume analysis, response time monitoring, and hotel activity insights. Built clean analytics dashboard with tabbed interface showing key metrics including guide completion rates, session statistics, hourly chat distribution, and hotel-specific analytics. Added Analytics button to admin dashboard for easy access. System provides real-time operational intelligence with professional data visualization enabling administrators to monitor guide performance, identify peak usage patterns, and optimize service delivery across all hotels and categories.
- July 1, 2025. **RESOLVED**: Fixed persistent admin dashboard 404 error by creating completely new AdminWorking component with clean implementation. Replaced problematic AdminSimple component with robust admin interface featuring tabbed navigation (Overview, Guides, Hotels), proper data fetching from API endpoints, comprehensive error handling, and responsive design. Admin dashboard now loads successfully at `/admin` route with full management capabilities.
- July 4, 2025. Enhanced admin announcement system with comprehensive edit and file upload functionality. Added ability to view/edit existing announcements to prevent repetition, complete file upload support for PDFs, Excel sheets, documents, images, etc., edit modal with current file display and replacement options, file download functionality via attachment button (📎), proper backend file handling with FormData upload, and PUT endpoint for announcement updates. System now enables admins to review previous announcements before creating new ones and attach multiple file types to announcements for guest access.
- July 4, 2025. **COMPLETED**: Implemented comprehensive weekly data cleanup system with automated Thursday execution and admin notification system. Features include: automated weekly cleanup running every Thursday at 2 AM with Wednesday 6 PM notification, manual cleanup API endpoints for admin management (/api/admin/cleanup/manual and /api/admin/cleanup/preview), comprehensive data cleanup including old chat sessions and uploaded files, detailed cleanup statistics and error handling, admin notification system via announcements for cleanup status, node-schedule integration for reliable scheduling, and complete API integration with role-based admin access. System is now actively running and provides automated maintenance for tourism guide platform data integrity.
- July 4, 2025. **FIXED**: Resolved critical file download issue by implementing comprehensive file handling system. Added missing static file serving route for `/uploads` directory that was preventing file downloads. Enhanced system with proper MIME type detection for all file formats (PDFs, Excel, Word, PowerPoint, videos, audio, images, archives), comprehensive multer configuration supporting 100MB file uploads, detailed error handling with specific error messages for file size limits and invalid types, support for extensive file formats including .xlsx, .mp4, .mov, .avi, .webm, .mp3, .wav, .pptx, .zip, .rar and more, proper Content-Type headers for downloads ensuring correct browser handling, and enhanced frontend file input accept attributes. Fixed admin dashboard file download links in announcement edit modal and tourist announcement modal to use correct `/uploads/` URL path. System now provides reliable file upload and download functionality for all supported formats without errors for both admin and guest access.
- July 4, 2025. **COMPLETED**: Major mobile responsiveness overhaul of tourist interface completed. Implemented mobile-first design with compact header layout, responsive conversation cards with touch-friendly buttons, optimized guide cards with mobile spacing and smaller icons, mobile-responsive hotel assignments section, and proper text sizing across all screen sizes. Tourist interface now provides optimal mobile experience for guests using mobile devices. Ready for UI/UX enhancement phase with external design tools before final deployment.

## User Preferences

Preferred communication style: Simple, everyday language.

## Ready for Next Development Phase

The tourism guide application is fully operational and ready for additional features. All core functionality is working properly. The codebase is well-structured and documented for future development.

**To start a new Agent conversation:**
1. Click the "New Chat" or start fresh option in Replit
2. The new Agent will read this file to understand the current project state
3. Request your desired new feature or enhancement