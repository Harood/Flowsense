Create a complete web application design for "FlowSense" - an AI-powered 
water management system. Design a modern, clean, professional interface 
optimized for desktop/laptop screens (1440px width).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OVERALL DESIGN STYLE:
- Modern, minimalist, clean aesthetic
- Color Palette:
  Primary Blue: #0066CC (trust, water)
  Light Blue: #E3F2FD (backgrounds)
  Accent Aqua: #00D4FF (highlights)
  Success Green: #00C853 (positive actions)
  Alert Red: #FF3B30 (warnings)
  Text Dark: #1F2937
  Text Gray: #6B7280
  Background: #F9FAFB

- Typography:
  Headers: Inter or Poppins (Bold, 24-32px)
  Body: Inter or Roboto (Regular, 14-16px)
  Numbers: Tabular figures for data consistency

- Spacing: 8px grid system (8, 16, 24, 32, 48px)
- Border Radius: 8px for cards, 24px for buttons
- Shadows: Subtle elevation (0 2px 8px rgba(0,0,0,0.08))

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SCREEN 1: LOGIN / LANDING PAGE
Canvas Size: 1440px × 900px

Layout:
LEFT SIDE (50% - Blue gradient background):
- Large water droplet icon/illustration (centered)
- "FlowSense" logo and wordmark (white text)
- Tagline below: "Sense Your Flow. Save Your Future."
- 3 feature bullets with icons:
  • Real-time monitoring
  • AI-powered insights
  • Save water & money

RIGHT SIDE (50% - White background):
- Centered login form card (400px width, elevated shadow)
- Card contains:
  • "Welcome Back" heading (28px bold)
  • Email input field (with icon)
  • Password input field (with eye icon)
  • "Forgot Password?" link (right-aligned)
  • Blue "Login" button (full width, 48px height)
  • Divider line with "or"
  • "Sign Up" text link (centered, gray)
  • Small text: "By continuing, you agree to Terms & Privacy"

Visual Elements:
- Water ripple pattern background on left side
- Smooth gradient: #0066CC to #00D4FF
- Glassmorphism effect on login card (optional)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SCREEN 2: DASHBOARD (MAIN SCREEN)
Canvas Size: 1440px × 1024px

Layout Structure:
┌─────────────────────────────────────────────────────────┐
│  TOP NAVIGATION BAR (height: 72px)                      │
├──────────┬──────────────────────────────────────────────┤
│          │                                              │
│  LEFT    │          MAIN CONTENT AREA                   │
│  SIDEBAR │                                              │
│ (256px)  │                                              │
│          │                                              │
└──────────┴──────────────────────────────────────────────┘

TOP NAVIGATION BAR:
- Left: "FlowSense" logo + water droplet icon
- Center: Global search bar (400px, placeholder: "Search...")
- Right: 
  • Notification bell icon (with red dot badge "2")
  • User avatar dropdown (circular, 40px)
  • User name "Sarah Ahmed" with small arrow

LEFT SIDEBAR (Dark blue #0A1E3D background):
- Navigation items (with icons):
  1. 📊 Dashboard (active - highlighted in lighter blue)
  2. 💬 AI Assistant
  3. 📈 Insights
  4. 🎯 Goals
  5. 📄 Reports
  6. ⚙️ Settings
- Bottom: "Logout" link
- Active state: Left border accent (4px aqua) + light background

MAIN CONTENT AREA:
Grid Layout: 12 columns with 24px gutters

ROW 1 - HEADER:
- "Good Morning, Sarah" (24px bold)
- Date and time (14px gray) "Monday, March 2, 2026 • 9:34 AM"
- Quick action button: "+ Set New Goal" (top right)

ROW 2 - HERO STATS CARD (Full width, gradient blue background):
- Large circular gauge/progress ring (center-left, 200px diameter)
  • Shows "350L" in center (48px bold white)
  • Arc progress: 87.5% filled (aqua color)
  • Label below: "of 400L daily goal"
- Right side stats (3 columns):
  STAT 1: "This Month" - "10,450L" (large white number)
  STAT 2: "vs Last Month" - "-15%" with down arrow (green)
  STAT 3: "Estimated Bill" - "₨3,200" (large white number)

ROW 3 - BREAKDOWN CARDS (3 equal columns, 24px gap):
CARD 1 - BATHROOM:
- Icon: Shower head (top left)
- "Bathroom" label
- Large "45%" (primary blue)
- "158L today" (gray subtext)
- Mini sparkline graph showing trend

CARD 2 - KITCHEN:
- Icon: Faucet
- "Kitchen" label
- Large "30%" (green)
- "105L today"
- Mini sparkline graph

CARD 3 - GARDEN:
- Icon: Garden hose/plant
- "Garden" label
- Large "25%" (yellow)
- "87L today"
- Mini sparkline graph

ROW 4 - TWO COLUMN LAYOUT:

LEFT COLUMN (66% width):
WEEKLY USAGE CHART CARD:
- Header: "Weekly Overview" with dropdown "Last 7 Days"
- Line chart (Recharts style):
  • X-axis: Mon, Tue, Wed, Thu, Fri, Sat, Sun
  • Y-axis: 0L to 500L
  • Two lines:
    - This week (solid blue line)
    - Last week (dashed gray line)
  • Dots on data points
  • Hover tooltips
- Legend at top right

RIGHT COLUMN (33% width):
AI INSIGHTS CARD:
- Header: "AI Insights" with lightbulb icon
- 3 insight items (stacked):
  1. Icon: 💡
     "Your showers average 12 mins vs 8 min household avg"
     "Save ₨450/month" (green pill badge)
  2. Icon: 🌧️
     "Rain forecast tomorrow - skip garden watering"
     "Save 120L" (blue pill badge)
  3. Icon: ⚠️
     "Slight increase in night usage detected"
     "Check for leaks" (yellow pill badge)
- "View All Insights →" link at bottom

ROW 5 - ALERT BANNER (if applicable):
- Red/orange gradient background
- Warning icon (left)
- "Possible Leak Detected!"
- "Continuous 3L/min flow from 3:00-6:00 AM • Bathroom Sensor"
- "View Details" button (right)
- Dismiss "X" icon

BOTTOM RIGHT - FLOATING ACTION:
- Circular blue button with chat icon
- Label: "Ask AI"
- Subtle shadow, hover lift effect

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SCREEN 3: AI CHATBOT INTERFACE
Canvas Size: 1440px × 1024px

Layout: Same sidebar + top nav

MAIN CONTENT:
Full-height chat interface (similar to ChatGPT)

TOP SECTION:
- "FlowSense AI Assistant" heading
- Subtext: "Ask me anything about your water usage"
- Small badge: "Powered by Claude AI"

CHAT AREA (scrollable, white background):
Message bubbles:

AI MESSAGE (Left-aligned):
- Avatar: Blue circular icon with AI sparkle
- Light gray bubble background (#F3F4F6)
- Text: "Hello Sarah! I noticed your usage spiked yesterday. 
  Your bathroom consumed 200L vs usual 120L. Were you running 
  laundry or had guests?"
- Timestamp below: "9:30 AM"

USER MESSAGE (Right-aligned):
- Blue bubble background (#0066CC)
- White text: "We had guests for dinner. Is that normal?"
- Timestamp: "9:31 AM"

AI MESSAGE:
- "Yes, that's completely normal! Guest visits typically increase 
  usage by 30-40%. I've noted this pattern. Your overall monthly 
  trend is still on track for your 10,000L goal."
- Action buttons below message:
  • "Show me the data" (outlined button)
  • "Set a reminder" (outlined button)

BOTTOM INPUT AREA (fixed):
- Large text input field (full width minus padding)
- Placeholder: "Type your question here..."
- Send button (blue, arrow icon)
- Voice input icon (microphone)
- Attachment icon
- Example prompts (small chips above input):
  "Why is my bill high?" | "How can I save water?" | "Predict next month"

SIDEBAR (optional, right side - 300px):
"Quick Stats" card:
- Today: 350L
- This week: 2,450L
- This month: 10,450L

"Suggested Questions" card:
- "Analyze my bathroom usage"
- "Compare to last month"
- "Find leak patterns"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SCREEN 4: INSIGHTS / ANALYTICS PAGE
Canvas Size: 1440px × 1024px

Layout: Same sidebar + top nav

MAIN CONTENT:

HEADER:
- "Insights & Analytics" heading
- Date range selector: "January 2026" with < > arrows
- Export button (top right): "Download Report" (PDF icon)

ROW 1 - KPI CARDS (4 equal columns):
CARD 1: "Total Usage"
- Large number: "10,450L"
- Change indicator: "↓ 15% vs last month" (green)

CARD 2: "Average Daily"
- Large number: "348L"
- Change: "↓ 8%" (green)

CARD 3: "Leaks Detected"
- Large number: "2"
- Status: "Both resolved" (green check)

CARD 4: "Money Saved"
- Large number: "₨850"
- Change: "↑ vs goal" (green)

ROW 2 - MAIN CHART (Full width card):
- Tab navigation: "Daily" | "Weekly" | "Monthly" (Monthly selected)
- Advanced line/area chart:
  • Multi-line: Bathroom, Kitchen, Garden (different colors)
  • Stacked area chart option
  • Interactive tooltips
  • Annotations for events (e.g., "Leak fixed", "Guests")
  • Comparison toggle: "Compare to last month" (checkbox)

ROW 3 - TWO COLUMNS:

LEFT (60%): USAGE PATTERNS CARD
- "Peak Usage Times" heading
- Heatmap visualization:
  • X-axis: Time of day (12 AM - 11 PM)
  • Y-axis: Days of week (Mon-Sun)
  • Color intensity: Light blue (low) to dark blue (high)
  • Tooltips on hover

RIGHT (40%): BREAKDOWN PIE CHART
- "Usage Distribution" heading
- Donut chart:
  • Bathroom: 45% (blue slice)
  • Kitchen: 30% (green slice)
  • Garden: 25% (yellow slice)
- Legend with exact liters
- Center shows total: "10,450L"

ROW 4 - RECOMMENDATIONS PANEL:
- "AI Recommendations" heading with stars icon
- List of cards (3 items):
  CARD 1:
  - Priority badge: "HIGH IMPACT"
  - "Reduce shower time from 12 to 8 minutes"
  - Impact: "Save 3,600L/month • ₨720"
  - Difficulty: Easy (green pill)
  - "Set Goal" button

  CARD 2:
  - Priority: "MEDIUM IMPACT"
  - "Water garden at 6 AM instead of 2 PM"
  - Impact: "30% more efficient • Save 1,200L/month"
  - Difficulty: Easy
  - "Learn More" link

  CARD 3:
  - Priority: "LOW EFFORT"
  - "Run dishwasher only when full"
  - Impact: "Save 400L/month"
  - Difficulty: Easy
  - Checkmark: "Already following" (disabled state)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SCREEN 5: GOALS & ACHIEVEMENTS PAGE
Canvas Size: 1440px × 1024px

Layout: Same sidebar + top nav

MAIN CONTENT:

HEADER:
- "Goals & Achievements" heading
- "+ Create New Goal" button (top right, blue)

ROW 1 - ACTIVE GOAL CARD (Featured, gradient background):
- Left side:
  • Trophy icon (large, animated)
  • "Current Goal" label
  • Goal name: "Reduce Daily Usage to 380L"
  • Start date: "Started Jan 15, 2026"
- Center:
  • Large circular progress ring (similar to dashboard)
  • "350L" current (inside ring)
  • "380L" target
  • "92%" progress percentage
- Right side:
  • "5 days remaining"
  • Progress bars for sub-goals:
    - Bathroom: 75% (blue bar)
    - Kitchen: 85% (green bar)
    - Garden: 95% (yellow bar)
- Bottom: "On track to complete 2 days early!" (green banner)

ROW 2 - GOAL HISTORY (Timeline view):
- "Past Goals" heading
- Vertical timeline (left border line):
  
  ITEM 1:
  - Green checkmark icon
  - "Reduce Bathroom Usage by 20%" (strikethrough)
  - "Completed Jan 20, 2026"
  - Stats: "Achieved 22% reduction • Saved 2,400L"
  
  ITEM 2:
  - Green checkmark
  - "Fix Kitchen Leak"
  - "Completed Dec 28, 2025"
  - Stats: "Detected on Dec 15 • Saved ₨1,200"

  ITEM 3:
  - Red X icon
  - "Reduce Garden Watering by 30%" (faded)
  - "Abandoned Dec 10, 2025"
  - Reason: "Weather too hot, plants needed water"

ROW 3 - ACHIEVEMENTS SECTION:
- "Achievements Unlocked" heading
- Grid of achievement badges (4 columns):

  BADGE 1 (Unlocked - colored):
  - Icon: Water droplet with checkmark
  - "First Week" achievement
  - "Tracked usage for 7 days"
  - Date: "Jan 8, 2026"

  BADGE 2 (Unlocked):
  - Icon: Detective magnifying glass
  - "Leak Hunter"
  - "Detected and fixed a leak"
  - Date: "Jan 12, 2026"

  BADGE 3 (Unlocked):
  - Icon: Downward trend arrow
  - "Water Saver"
  - "Reduced usage by 15%"
  - Date: "Jan 20, 2026"

  BADGE 4 (Locked - grayscale):
  - Icon: Trophy (grayed out)
  - "Eco Champion" (locked)
  - "Save 10,000L total"
  - Progress bar: 85% (8,500L saved)

  BADGE 5 (Locked):
  - Icon: Streak flame
  - "30-Day Streak"
  - "Stay under goal for 30 days"
  - Progress: 18/30 days

  BADGE 6 (Locked):
  - Icon: Community/group
  - "Neighborhood Leader"
  - "Top 10% in your area"
  - Currently: "Top 23%"

ROW 4 - LEADERBOARD (Optional):
- "Community Impact" heading
- Anonymous comparison:
  • "You" - Rank #127 out of 500
  • "Top 10% = under 320L/day"
  • "You: 350L/day"
  • Progress bar showing position

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SCREEN 6: ALERT DETAILS PAGE
Canvas Size: 1440px × 900px

Layout: Modal overlay OR full page

ALERT MODAL (800px width, centered):
- Semi-transparent dark background overlay
- White modal card with shadow

HEADER:
- Large warning triangle icon (red/orange, 64px)
- "Leak Alert Detected" heading (24px bold red)
- Close X button (top right)

ALERT DETAILS CARD:
Section 1 - KEY INFO:
- Time: "Detected at 3:15 AM on March 2, 2026"
- Duration: "3 hours continuous flow"
- Location: "Bathroom Toilet Sensor" (with location icon)
- Flow Rate: "3.0 L/min" (with water icon)
- Volume Wasted: "540L" (large red number)
- Estimated Cost: "₨270" (gray subtext)

Section 2 - VISUALIZATION:
- Small line chart showing the anomaly:
  • X-axis: Time (12 AM - 6 AM)
  • Y-axis: Flow rate
  • Spike clearly visible at 3 AM
  • Shaded area indicating leak period

Section 3 - AI DIAGNOSIS:
- Card with light blue background
- AI icon
- "FlowSense AI Analysis" heading
- Text: "This continuous flow pattern is consistent with a 
  toilet flapper valve issue. The flow rate (3L/min) matches 
  typical running toilet patterns. This is a common problem 
  and usually easy to fix."

Section 4 - RECOMMENDED ACTIONS:
- Numbered steps:
  1. "Check toilet tank for continuous running water"
  2. "Inspect flapper valve for wear or debris"
  3. "Replace flapper valve if damaged (₨500-1,000)"
  4. "If problem persists, call plumber"
- "Watch Video Tutorial" link

Section 5 - IMPACT ASSESSMENT:
- Warning box:
  "If not fixed, this leak will waste approximately:
  • 540L daily
  • 16,200L monthly
  • ₨8,100 additional cost/month"

BOTTOM ACTIONS:
- "Mark as Resolved" button (green, primary)
- "Remind Me Later" button (gray, secondary)
- "False Alarm - Dismiss" link (small, gray)

HISTORY SIDEBAR (right, 200px):
- "Recent Alerts" heading
- List of past alerts (small cards):
  • "High usage - Jan 28" (resolved)
  • "Night flow - Jan 15" (resolved)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SCREEN 7: SETTINGS PAGE
Canvas Size: 1440px × 1024px

Layout: Same sidebar + top nav

MAIN CONTENT:
Two-column layout:

LEFT SIDEBAR (Settings Navigation - 280px):
- Section headers with menu items:
  ACCOUNT:
  • Profile (selected)
  • Security
  • Notifications
  
  PREFERENCES:
  • Units & Display
  • Goals & Alerts
  • Privacy
  
  SYSTEM:
  • Sensors
  • Integrations
  • Billing

RIGHT CONTENT AREA (Profile Settings):
- "Profile Settings" heading

SECTION 1 - PERSONAL INFO:
- Avatar upload (circular, 100px, with camera icon overlay)
- Form fields:
  • Full Name: "Sarah Ahmed" (input)
  • Email: "sarah.ahmed@email.com" (input)
  • Phone: "+92 300 1234567" (input)

SECTION 2 - HOUSEHOLD INFO:
- Household Size: "4 people" (dropdown)
- Property Type: "House" (dropdown options: House, Apartment, etc.)
- Location: "Karachi, Pakistan" (input with location icon)

SECTION 3 - WATER UTILITY:
- Water Provider: "Karachi Water Board" (dropdown)
- Rate Structure: "Tiered Pricing" (dropdown)
- Billing Cycle: "Monthly, 1st of month" (date picker)

SECTION 4 - PREFERENCES:
- Language: "English" (dropdown: English, Urdu)
- Temperature Unit: "Celsius" (toggle: C / F)
- Volume Unit: "Liters" (toggle: L / Gallons)
- Date Format: "DD/MM/YYYY" (dropdown)

BOTTOM ACTIONS:
- "Save Changes" button (blue, right)
- "Cancel" button (gray, right)
- "Delete Account" link (red, left, small)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMPONENT LIBRARY TO CREATE:

Reusable Components:
1. Buttons:
   - Primary (blue, white text)
   - Secondary (outlined blue)
   - Danger (red)
   - Text button (no background)

2. Cards:
   - Stat card (with icon, number, subtext)
   - Content card (white bg, shadow, padding)
   - Alert card (colored border left)

3. Form Inputs:
   - Text input (with icon support)
   - Dropdown/Select
   - Toggle switch
   - Checkbox
   - Radio buttons

4. Charts (styles for):
   - Line chart
   - Bar chart
   - Donut/Pie chart
   - Area chart
   - Heatmap

5. Icons:
   - Water droplet
   - Dashboard/home
   - Chat/message
   - Insights/graph
   - Goals/target
   - Settings/gear
   - Warning triangle
   - Checkmark
   - Arrow (up/down/left/right)
   - User avatar
   - Notification bell
   - Search
   - Calendar

6. Navigation:
   - Top nav bar
   - Sidebar nav
   - Breadcrumbs

7. Alerts/Notifications:
   - Success (green)
   - Warning (yellow)
   - Error (red)
   - Info (blue)

8. Progress Indicators:
   - Circular progress ring
   - Linear progress bar
   - Percentage badge

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DESIGN SYSTEM SPECS:

Grid: 12-column grid, 24px gutters
Breakpoints:
- Desktop: 1440px
- Laptop: 1024px
- Tablet: 768px (responsive considerations)

Elevation/Shadows:
- Level 1 (cards): 0 1px 3px rgba(0,0,0,0.12)
- Level 2 (hover): 0 4px 12px rgba(0,0,0,0.15)
- Level 3 (modal): 0 8px 24px rgba(0,0,0,0.2)

Animation:
- Transitions: 200ms ease-in-out
- Hover states: Slight lift (2px) + shadow increase
- Loading: Shimmer effect for skeleton screens
- Chart animations: Smooth entry (500ms)

Accessibility:
- Contrast ratio: 4.5:1 minimum for text
- Focus states: 2px blue outline
- Alt text for all icons
- ARIA labels for interactive elements

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FINAL NOTES:
- All screens should share consistent header + sidebar
- Use real data examples (not Lorem Ipsum)
- Include empty states ("No alerts", "No goals set")
- Show loading states (skeleton screens)
- Include error states (connection failed, etc.)
- Add tooltips for complex UI elements
- Ensure responsive scaling for different screen sizes
- Export all assets as components for easy React conversion

Create these 7 screens as separate frames in Figma, organized 
in logical order for presentation. Use Auto Layout for all 
components to make them flexible and easy to convert to code.