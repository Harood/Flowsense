Polish and enhance the FlowSense web application interface with the 
following specific improvements and new features. Maintain the existing 
design system (Primary Blue: #0066CC, Aqua: #00D4FF, backgrounds, etc.).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TASK 1: LOGIN PAGE - DROPLET EFFECT REFINEMENT
Canvas: 1440px × 900px

LEFT SIDE (Blue gradient background):
Improved droplet visual effect:

MAIN DROPLET:
- Large water droplet illustration (300px height)
- Position: Vertically and horizontally centered
- Style: 
  • Outline: 3px white stroke with 50% opacity
  • Fill: Gradient (light blue #4DA3FF to aqua #00D4FF)
  • Glass/glossy effect: Add highlight on top-left (white, 30% opacity)
  • Shadow inside droplet: Subtle dark blue (#0055AA, 20% opacity)
- Animation (optional for later):
  • Gentle floating: Move up/down 10px over 3 seconds
  • Subtle rotation: -2° to +2° over 4 seconds

BACKGROUND RIPPLES:
- 3 concentric circles emanating from droplet center
- Circle 1 (inner): 350px diameter, 1px white 20% opacity
- Circle 2 (middle): 450px diameter, 1px white 15% opacity  
- Circle 3 (outer): 550px diameter, 1px white 10% opacity
- Animation (optional): Pulsing scale 98% to 102% over 2 seconds

ACCENT DROPLETS (decorative):
- 3-4 smaller droplets floating around main droplet
- Sizes: 40px, 60px, 80px
- Positions: Scattered asymmetrically
- Style: Semi-transparent white (30% opacity)
- Blur: 2px gaussian blur for depth

BACKGROUND GRADIENT:
- Top: #0066CC
- Middle: #0055AA  
- Bottom: #004488
- Overlay: Radial gradient from center (white 5% opacity) for glow effect

ALIGNMENT CHECK:
- Droplet must be perfectly centered vertically
- Horizontal center should align with 50% of left panel width
- Minimum 80px margin from all edges
- Logo "FlowSense" positioned 48px from top
- Feature bullets positioned 48px from bottom

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TASK 2: NOTIFICATION BELL - FUNCTIONAL UI
Location: Top navigation bar (all pages)

NOTIFICATION BELL ICON:
Position: Top right, between search bar and user avatar
Size: 24px × 24px icon
Color: #6B7280 (default), #0066CC (on hover/active)

NOTIFICATION BADGE:
- Small red circle positioned top-right of bell icon
- Size: 18px diameter
- Background: #FF3B30 (red)
- Text: White, 11px bold
- Content: Number of unread notifications (e.g., "3")
- Animation: Gentle pulse when new notification arrives

NOTIFICATION DROPDOWN PANEL:
Trigger: Click on bell icon
Size: 380px width × auto height (max 600px)
Position: Anchored below bell icon, right-aligned
Shadow: 0 8px 24px rgba(0,0,0,0.15)
Border radius: 12px

DROPDOWN HEADER:
- Background: White
- Padding: 20px
- Border bottom: 1px solid #E5E7EB

Top row (space-between):
- Left: "Notifications" (18px bold, #1F2937)
- Right: "Mark all as read" link (14px, #0066CC, clickable)

Tabs below:
- "All (3)" | "Unread (2)" | "Alerts (1)"
- Active tab: Blue underline (3px), bold text
- Inactive: Gray text, no underline

NOTIFICATION LIST (scrollable):
Each notification item:

STRUCTURE:
┌──────────────────────────────────────────────┐
│ [Icon] Notification Title            [Time] │
│        Notification description text         │
│        [Action Button if applicable]         │
└──────────────────────────────────────────────┘

NOTIFICATION TYPES:

1. LEAK ALERT (High priority):
   - Icon: Red warning triangle (32px)
   - Background: #FEE2E2 (light red)
   - Border left: 4px solid #FF3B30
   - Title: "Leak Detected!" (16px bold, #991B1B)
   - Description: "Bathroom toilet - 3L/min continuous flow"
   - Time: "5 min ago" (12px, gray, top-right)
   - Action button: "View Details" (blue, outlined)
   - Unread indicator: Blue dot (8px) on left

2. GOAL ACHIEVED (Success):
   - Icon: Green trophy (32px)
   - Background: #D1FAE5 (light green)
   - Border left: 4px solid #00C853
   - Title: "Goal Achieved! 🎉" (16px bold, #065F46)
   - Description: "You stayed under 380L for 7 days straight"
   - Time: "2 hours ago"
   - Action: "View Progress" button

3. DAILY SUMMARY (Info):
   - Icon: Blue chart icon (32px)
   - Background: #E3F2FD (light blue)
   - Border left: 4px solid #0066CC
   - Title: "Daily Summary Ready" (16px bold, #1E3A8A)
   - Description: "You used 342L today - 12% below goal"
   - Time: "1 day ago"
   - No action button (just clickable item)

4. SYSTEM UPDATE (Low priority):
   - Icon: Gray info icon (32px)
   - Background: #F3F4F6 (light gray)
   - Border left: 4px solid #6B7280
   - Title: "New Feature Available"
   - Description: "Check out weather-based watering suggestions"
   - Time: "3 days ago"

ITEM STATES:
- Unread: White background, blue dot indicator
- Read: #F9FAFB background, no dot
- Hover: Slight shadow, cursor pointer
- Click: Navigate to relevant page or expand details

DROPDOWN FOOTER:
- "View All Notifications" link (centered, 14px, blue)
- Padding: 16px

EMPTY STATE (when no notifications):
- Icon: Gray bell with slash (64px)
- Text: "No new notifications"
- Subtext: "You're all caught up!"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TASK 3: FIX "of 400L daily goal" TEXT VISIBILITY
Location: Dashboard - Usage Gauge Component

CURRENT ISSUE: Text not visible on dark background

SOLUTION - Update gauge design:

CIRCULAR GAUGE STRUCTURE:
- Outer ring: Progress arc (200px diameter)
  • Background arc: #E5E7EB (light gray, full circle)
  • Progress arc: Blue gradient (#0066CC to #00D4FF)
  • Thickness: 16px
  • Rounded ends (linecap: round)

CENTER CONTENT (inside circle):
- Main number: "350L" 
  • Size: 48px bold
  • Color: #1F2937 (dark, NOT white)
  • Position: Centered

- Goal text: "of 400L daily goal"
  • Size: 14px regular
  • Color: #6B7280 (medium gray, HIGH CONTRAST)
  • Position: Below main number, 8px gap
  • Background: NONE (transparent)
  • If needed: Add white 80% background circle behind text

ALTERNATIVE DESIGN (if visibility still issues):
Move goal text OUTSIDE and BELOW the gauge:
- Gauge remains centered
- Below gauge (16px gap):
  • "Daily Goal: 400L" 
  • Size: 16px medium
  • Color: #4B5563 (dark gray)
  • Centered alignment

PERCENTAGE INDICATOR (optional add):
- Small pill badge attached to gauge
- Position: Top-right of gauge arc
- Content: "87.5%" 
- Background: White with shadow
- Text: #0066CC bold 12px

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TASK 4: GOAL BUTTONS UI DESIGN

A. "SET GOAL" BUTTON - Dashboard & Insights Pages

LOCATION: Dashboard top-right corner (near date/time)

BUTTON DESIGN:
- Size: Auto width × 44px height
- Padding: 12px 24px
- Background: Linear gradient (#0066CC to #0055AA)
- Border: None
- Border radius: 22px (pill shape)
- Text: "Set New Goal" 
  • Color: White
  • Size: 15px bold
  • Icon: Target icon (left, 18px, white)
- Shadow: 0 2px 8px rgba(0,102,204,0.3)

HOVER STATE:
- Lift: Transform translateY(-2px)
- Shadow: 0 4px 12px rgba(0,102,204,0.4)
- Background: Slightly lighter gradient
- Cursor: pointer
- Transition: 200ms ease

CLICK/ACTIVE STATE:
- Scale down: Transform scale(0.98)
- Shadow reduce
- Brief animation

ALTERNATIVE STYLE (Outlined version for Insights page):
- Background: White
- Border: 2px solid #0066CC
- Text color: #0066CC
- Icon color: #0066CC
- Hover: Light blue background (#E3F2FD)

B. "CREATE NEW GOAL" BUTTON - Goals Page Header

LOCATION: Goals page top-right

BUTTON DESIGN (Primary, larger):
- Size: Auto × 52px height
- Padding: 16px 32px
- Background: Blue gradient
- Text: "+ Create New Goal"
  • White, 16px bold
  • Plus icon (20px)
- Border radius: 8px (less rounded than pill)
- Shadow: More prominent

ICON ANIMATION (on hover):
- Plus icon rotates 90° 
- Transition: 300ms ease

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TASK 5: REMOVE "Powered by Claude AI" FROM AI ASSISTANT PAGE

LOCATION: AI Assistant/Chatbot page header

CURRENT LAYOUT TO MODIFY:
Before:
- "FlowSense AI Assistant" (heading)
- "Ask me anything about your water usage" (subtext)
- "Powered by Claude AI" badge (REMOVE THIS)

UPDATED LAYOUT:
- "FlowSense AI Assistant" (heading, 28px bold)
- "Ask me anything about your water usage" (subtext, 16px gray)
- NO badge or branding below

ALTERNATIVE (if you want to keep AI indicator):
- Small discrete text in footer of page:
  "Powered by advanced AI" (11px, light gray)
  Position: Bottom-right corner
  Low opacity (50%)

OR use a simple icon:
- Sparkle/star icon (✨) next to heading
- Tooltip on hover: "AI-powered assistant"
- No text label

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TASK 6: GOALS PAGE REDESIGN - REMOVE ACHIEVEMENTS, ADD ALTERNATIVES

ORIGINAL LAYOUT:
❌ Remove: Achievement badges section
❌ Remove: Community ranking/leaderboard section

NEW GOALS PAGE STRUCTURE:
Canvas: 1440px × 1024px (same sidebar + nav)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HEADER:
- "Goals" (32px bold)
- "+ Create New Goal" button (top-right)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ROW 1 - ACTIVE GOALS (if user has goals):
Same as before - featured goal card with progress ring

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ROW 2 - RECOMMENDED GOALS SECTION (NEW):
Heading: "Recommended Goals for You" 
Subtext: "Based on your usage patterns" (AI sparkle icon)

3 RECOMMENDATION CARDS (horizontal cards, stack vertically):

CARD 1 - HIGH IMPACT GOAL:
Structure (horizontal layout):
┌────────────────────────────────────────────────────────┐
│ [Icon]  Goal Title                    [Set Goal BTN]  │
│         Description                                     │
│         💧 Impact: Save X L/month  ⏱️ Difficulty: Easy │
└────────────────────────────────────────────────────────┘

Example:
- Badge: "HIGH IMPACT" (orange pill, top-left)
- Icon: Shower (64px, blue)
- Title: "Reduce Shower Time to 8 Minutes" (20px bold)
- Description: "Your current average is 12 minutes. Reducing to 8 
  minutes can save significant water without compromising comfort."
- Impact metrics:
  • 💧 Save: 3,600L/month
  • 💰 Cost: ₨720 savings
  • ⏱️ Difficulty: Easy
  • 📅 Duration: 30 days
- Button: "Set This Goal" (blue, right side)

CARD 2 - QUICK WIN GOAL:
- Badge: "QUICK WIN" (green pill)
- Icon: Faucet
- Title: "Fix Kitchen Dripping Tap"
- Description: "We detected a slow drip in your kitchen. Fixing 
  this small issue can prevent 2,400L waste monthly."
- Impact: 2,400L/month, ₨480, Very Easy, Immediate
- Button: "Set This Goal"

CARD 3 - SEASONAL GOAL:
- Badge: "SEASONAL" (blue pill)
- Icon: Plant/Garden
- Title: "Optimize Garden Watering Schedule"
- Description: "Water your garden early morning (6-8 AM) instead 
  of afternoon to reduce evaporation by 40%."
- Impact: 1,800L/month, ₨360, Medium, Ongoing
- Button: "Set This Goal"

CARD DESIGN SPECS:
- Background: White
- Border: 1px solid #E5E7EB
- Border radius: 12px
- Padding: 24px
- Hover state: Slight shadow increase, border color blue
- Spacing between cards: 16px

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ROW 3 - GOAL HISTORY (keep this):
Same timeline design as before showing completed/abandoned goals

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ROW 4 - GOAL TEMPLATES SECTION (NEW ADDITION):
Heading: "Popular Goal Templates"
Subtext: "Choose a pre-made goal to get started quickly"

TEMPLATE GRID (4 columns):

TEMPLATE CARD (compact):
┌─────────────────────┐
│      [Icon]         │
│   Template Name     │
│   Brief desc        │
│   [Use Template]    │
└─────────────────────┘

Template examples:
1. "30-Day Water Challenge"
   Icon: Calendar
   "Reduce usage by 20% in one month"
   
2. "Leak-Free Home"
   Icon: Shield
   "Zero leak tolerance goal"
   
3. "Eco Warrior"
   Icon: Leaf
   "Match top 10% water savers"
   
4. "Budget Saver"
   Icon: Piggy bank
   "Cut bill by ₨500/month"

5. "Morning Optimizer"
   Icon: Sun
   "Reduce morning routine water usage"
   
6. "Garden Guardian"
   Icon: Plant
   "Smart outdoor watering"

CARD SPECS:
- Size: 280px × 200px
- Background: Light blue gradient
- Border radius: 12px
- Icon: 48px, centered
- Title: 16px bold, centered
- Description: 14px, gray, centered
- Button: "Use Template" (small, outlined)
- Hover: Scale 1.02, shadow

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EMPTY STATE (if no active goals):
- Large target icon (128px, light gray)
- Heading: "No Active Goals Yet"
- Subtext: "Set your first goal to start saving water"
- Primary CTA: "Create Your First Goal" (large blue button)
- Below: "Or choose from recommended goals below ↓"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TASK 7: REPORTS SECTION - NEW PAGE DESIGN

Canvas: 1440px × 1024px
Layout: Same sidebar + top navigation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REPORTS PAGE HEADER:
- "Reports" (32px bold)
- Subtext: "View and download your water usage reports"
- Right side controls:
  • Date range picker: "Last 30 Days" (dropdown)
  • Export button: "Download PDF" (icon: download, outlined)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ROW 1 - REPORT TYPE TABS:
Tab navigation (horizontal):
- Monthly Report (active)
- Weekly Report
- Custom Report
- Comparison Report

Active tab: Blue underline, bold text
Inactive: Gray, regular weight

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MONTHLY REPORT VIEW:

SUMMARY CARD (full width, gradient blue background):
Layout (4 columns):

COLUMN 1:
- Icon: Calendar
- "January 2026"
- "Total Usage"
- "10,450L" (large white number)

COLUMN 2:
- Icon: Trend down
- "Change"
- "-15%" (green with down arrow)
- "vs December"

COLUMN 3:
- Icon: Coin stack
- "Total Cost"
- "₨3,150"
- "Saved ₨600"

COLUMN 4:
- Icon: Target
- "Goal Status"
- "Achieved ✓" (green)
- "23/31 days"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ROW 2 - DETAILED BREAKDOWN (two columns):

LEFT COLUMN (60%):

USAGE CHART CARD:
- "Daily Usage Breakdown"
- Bar chart showing each day of month
- X-axis: Days 1-31
- Y-axis: Liters
- Bars colored by status:
  • Green: Below goal
  • Yellow: Near goal
  • Red: Above goal
- Interactive: Click bar to see day details

USAGE BY CATEGORY PIE CHART:
- Donut chart
- Bathroom: 45% (4,702L)
- Kitchen: 30% (3,135L)  
- Garden: 25% (2,613L)
- Legend with exact values

RIGHT COLUMN (40%):

KEY INSIGHTS CARD:
- "This Month's Insights" heading
- AI-generated bullet points:
  ✓ "Lowest usage on Jan 15: 280L"
  ✓ "Highest usage on Jan 22: 420L (guests)"
  ⚠️ "Leak detected and fixed on Jan 12"
  💡 "Best week: Jan 8-14 (avg 310L/day)"
  📈 "Trending 12% better than last month"

COST BREAKDOWN CARD:
- "Billing Details"
- Tiered pricing breakdown:
  • 0-10,000L: 8,450L × ₨4 = ₨33,800
  • 10,001-12,000L: 2,000L × ₨6 = ₨12,000
  • Total: ₨45,800
  • Previous month: ₨54,000
  • Savings: ₨8,200 ✓

RECOMMENDATIONS CARD:
- "Next Month Recommendations"
- 3 actionable tips with impact estimates

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ROW 3 - HISTORICAL REPORTS LIST:

Table design:
┌──────────────────────────────────────────────────────────┐
│ Report Period │ Usage  │ Change │ Cost    │ Actions    │
├──────────────────────────────────────────────────────────┤
│ Jan 2026      │10,450L │ -15%   │₨3,150  │ 📥 🔍 📧   │
│ Dec 2025      │12,200L │ +8%    │₨3,750  │ 📥 🔍 📧   │
│ Nov 2025      │11,300L │ -5%    │₨3,450  │ 📥 🔍 📧   │
└──────────────────────────────────────────────────────────┘

Action icons:
- 📥 Download PDF
- 🔍 View Details
- 📧 Email Report

Table styling:
- Header: Bold, light blue background
- Rows: Alternating white/light gray
- Hover: Light blue background
- Icons: 20px, gray, hover blue

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WEEKLY REPORT TAB (when selected):

Similar structure but:
- Summary shows: "Week of Jan 20-26, 2026"
- Bar chart shows 7 days instead of 31
- Compares to previous week
- Shows daily patterns (Mon-Sun)
- Highlights: "Highest usage day: Saturday"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CUSTOM REPORT TAB:

REPORT BUILDER INTERFACE:

STEP 1 - DATE RANGE:
- "Select Date Range"
- Start date picker | End date picker
- Quick presets:
  • Last 7 days
  • Last 30 days
  • Last 3 months
  • Last year
  • Custom

STEP 2 - METRICS TO INCLUDE:
Checkboxes:
☑ Total usage
☑ Daily breakdown
☑ Usage by category
☑ Cost analysis
☑ Goal progress
☑ Leak incidents
☑ Recommendations
☐ Weather correlation

STEP 3 - FORMAT:
Radio buttons:
○ PDF Document
○ Excel Spreadsheet (.xlsx)
○ CSV Data
○ Email Summary

GENERATE BUTTON:
- "Generate Report" (large, blue)
- Shows loading spinner when processing
- Success: "Report ready! Download now"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMPARISON REPORT TAB:

Compare two time periods:

SELECTION INTERFACE:
- Period 1: January 2026 (dropdown)
- VS
- Period 2: December 2025 (dropdown)

COMPARISON DISPLAY:

Side-by-side cards:
┌─────────────────┐    ┌─────────────────┐
│   JANUARY 2026  │ VS │  DECEMBER 2025  │
│   10,450L       │    │   12,200L       │
│   -15% ✓        │    │                 │
└─────────────────┘    └─────────────────┘

Detailed comparison table:
Metric          | Jan 2026  | Dec 2025  | Change
─────────────────────────────────────────────────
Total Usage     | 10,450L   | 12,200L   | -14.3% ↓
Avg Daily       | 337L      | 394L      | -14.5% ↓
Bathroom        | 4,702L    | 5,490L    | -14.3% ↓
Kitchen         | 3,135L    | 3,660L    | -14.3% ↓
Garden          | 2,613L    | 3,050L    | -14.3% ↓
Cost            | ₨3,150    | ₨3,750    | -₨600  ↓
Leaks           | 1 fixed   | 0         | +1
Goal Days Met   | 23/31     | 18/31     | +5     ↑

Visual comparison:
- Dual-axis chart showing both periods overlaid
- Different colors for each period
- Clear legend

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REPORTS - EMPTY STATE (no data yet):
- Icon: Document with magnifying glass (128px)
- "No Reports Available Yet"
- "Reports will appear here once you have at least 
  7 days of data"
- Progress: "Day 3 of 7" (progress bar)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EXPORT/PDF PREVIEW MODAL:

When user clicks "Download PDF":
- Modal overlay appears (900px width)
- Preview of report as it will appear in PDF
- Shows: Cover page, summary, charts, tables
- Options:
  ☑ Include charts
  ☑ Include recommendations
  ☑ Include comparison data
  ☐ Email me a copy
- Buttons:
  • "Download PDF" (blue, primary)
  • "Cancel" (gray, secondary)

PDF COVER PAGE DESIGN:
- FlowSense logo (top)
- "Monthly Water Usage Report"
- "January 2026"
- User name: "Sarah Ahmed"
- Generated date
- Summary stats (total, change, cost)
- Footer: "Generated by FlowSense" + date

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMPONENT SPECIFICATIONS FOR ALL TASKS:

BUTTONS - Detailed specs:
Primary button:
- Height: 44px (small), 52px (large)
- Padding: 12px 24px (small), 16px 32px (large)
- Font: 15px bold (small), 16px bold (large)
- Border radius: 8px
- Background: Linear gradient #0066CC to #0055AA
- Text: White
- Shadow: 0 2px 8px rgba(0,102,204,0.3)
- Hover: translateY(-2px), shadow increase
- Active: scale(0.98)
- Disabled: #E5E7EB background, #9CA3AF text

Outlined button:
- Same dimensions
- Background: White
- Border: 2px solid #0066CC
- Text: #0066CC
- Hover: Background #E3F2FD

CARDS:
- Background: White
- Border: 1px solid #E5E7EB
- Border radius: 12px
- Shadow: 0 2px 8px rgba(0,0,0,0.08)
- Padding: 24px
- Hover: Shadow 0 4px 12px rgba(0,0,0,0.12)

TABLES:
- Header: Background #F3F4F6, text bold
- Rows: Alternate white / #F9FAFB
- Border: 1px solid #E5E7EB
- Cell padding: 12px 16px
- Font: 14px
- Hover row: Background #E3F2FD

ICONS:
- Size: 20px (small), 24px (medium), 32px (large)
- Color: #6B7280 (default), #0066CC (active/hover)
- Style: Outlined (Heroicons/Lucide)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DESIGN SYSTEM REMINDERS:
- Primary Blue: #0066CC
- Aqua Accent: #00D4FF
- Success Green: #00C853
- Warning Yellow: #F59E0B
- Error Red: #FF3B30
- Text Dark: #1F2937
- Text Gray: #6B7280
- Background: #F9FAFB
- Border: #E5E7EB

- Font: Inter or Poppins
- Spacing: 8px grid (8, 16, 24, 32, 48px)
- Shadows: Subtle, layered elevation
- Animations: 200ms ease-in-out
- Border radius: 8px (inputs), 12px (cards)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create these improvements maintaining design consistency across 
all pages. Export components for easy React implementation.