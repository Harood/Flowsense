Fix and develop the following issues in FlowSense web application. 
Maintain design consistency with the existing system (Primary Blue: #0066CC).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FIX 1: DASHBOARD - USAGE GAUGE COLOR SCHEME
Location: Dashboard page - Main hero card (blue gradient background)

CURRENT PROBLEM:
- "350L" text appears in black - doesn't match theme
- "of 400L daily goal" in gray - not visible against blue background

NEW DESIGN:

CIRCULAR GAUGE (remains same):
- Size: 200px diameter
- Arc background: rgba(255,255,255,0.2) (light white)
- Progress arc: Red gradient (#FF3B30 to #FF6B66) - indicates high usage
- Arc thickness: 16px
- Percentage badge: "88%" in white pill (background: rgba(255,255,255,0.9))

CENTER CONTENT (FIXED COLORS):
Main number: "350L"
- Color: #FFFFFF (pure white) - NOT black
- Font size: 56px bold
- Font weight: 800
- Text shadow: 0 2px 8px rgba(0,0,0,0.2) for depth

Goal text: "of 400L daily goal"
- Color: rgba(255,255,255,0.85) - NOT gray
- Font size: 16px medium
- Position: 12px below main number
- Letter spacing: 0.3px

ALTERNATIVE DESIGN (if visibility still issues):
Add semi-transparent white background behind text:
- Background: rgba(255,255,255,0.15)
- Border radius: 24px (pill shape)
- Padding: 16px 24px
- Backdrop filter: blur(10px) - glassmorphism effect
- Then use white text inside

COLOR CODING SYSTEM for gauge:
- Green (#00C853): 0-70% of goal (good usage)
- Yellow (#F59E0B): 71-90% of goal (near limit)
- Red (#FF3B30): 91-100%+ of goal (over/near over)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FIX 2: "CREATE NEW GOAL" & "SET GOAL" BUTTONS - MODAL DESIGN

These buttons appear on:
- Dashboard (top-right area or near goals section)
- Insights page (similar position)
- Goals page header ("Create New Goal")
- Recommended goals cards ("Set This Goal")

MODAL OVERLAY (when button clicked):
- Full-screen semi-transparent background: rgba(0,0,0,0.5)
- Center modal card: 700px width × auto height
- Background: White
- Border radius: 16px
- Shadow: 0 24px 48px rgba(0,0,0,0.3)
- Padding: 0 (content has own padding)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MODAL DESIGN: CREATE/SET GOAL

MODAL HEADER (blue gradient background):
- Background: Linear gradient #0066CC to #0055AA
- Padding: 32px
- Border radius top: 16px

Content:
- Icon: Target/bullseye (48px, white)
- Heading: "Create New Goal" or "Set Your Goal" (28px bold, white)
- Subtext: "Define your water-saving target" (16px, rgba(255,255,255,0.9))
- Close button (X): Top-right, white icon, 24px

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MODAL BODY (white background):
Padding: 32px

SECTION 1 - GOAL TYPE SELECTION:
Label: "Choose Goal Type" (16px bold, #1F2937)
Spacing: 16px below label

Radio cards (3 options, vertical stack, 12px gap):

OPTION 1: Daily Usage Target
┌─────────────────────────────────────────────────────┐
│ ○ Daily Usage Target                    [RECOMMENDED]│
│   Set a daily water consumption limit                │
│   Example: "Use no more than 380L per day"          │
└─────────────────────────────────────────────────────┘

OPTION 2: Reduce by Percentage
┌─────────────────────────────────────────────────────┐
│ ○ Reduce by Percentage                               │
│   Decrease usage by a specific amount               │
│   Example: "Reduce usage by 15%"                    │
└─────────────────────────────────────────────────────┘

OPTION 3: Category-Specific Goal
┌─────────────────────────────────────────────────────┐
│ ○ Category-Specific Goal                            │
│   Focus on bathroom, kitchen, or garden             │
│   Example: "Reduce bathroom usage by 20%"           │
└─────────────────────────────────────────────────────┘

Card styling:
- Background: White
- Border: 2px solid #E5E7EB
- Border radius: 12px
- Padding: 20px
- Selected state:
  • Border: 2px solid #0066CC
  • Background: #E3F2FD (light blue tint)
  • Radio button filled blue
- Hover: Border color #0066CC at 50% opacity

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 2 - GOAL DETAILS (changes based on selection):

FOR "DAILY USAGE TARGET":

Current Usage Display (info card):
- Background: #F3F4F6
- Padding: 16px
- Border radius: 8px
- Text: "Your current average: 400L/day" (14px, #6B7280)
- Icon: Info circle

Target Input:
- Label: "Set Your Daily Target" (16px medium)
- Large number input with controls:
  
  ┌─────────────────────────────────────┐
  │  [-]      380      [+]     Liters   │
  └─────────────────────────────────────┘
  
  - Minus/Plus buttons: 48px × 48px, rounded
  - Number display: 72px height, 36px font, bold, centered
  - Unit label: "Liters" (gray)

- Slider below (visual):
  • Range: 200L to 500L
  • Current: 380L (blue indicator)
  • Baseline marker at 400L (gray line)
  
Impact Preview (auto-calculated):
┌─────────────────────────────────────────┐
│ 💧 Expected Savings                     │
│ • 20L per day (5% reduction)            │
│ • 600L per month                        │
│ • ₨120 cost savings monthly             │
│ ✓ Achievable based on your patterns    │
└─────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FOR "REDUCE BY PERCENTAGE":

Current usage info (same as above)

Percentage Selector:
- Label: "Reduction Percentage"
- Slider with percentage:
  • Range: 5% to 30%
  • Steps: 5%
  • Large percentage display above slider: "15%" (48px)
  • Color codes:
    - 5-10%: Green (easy)
    - 11-20%: Yellow (moderate)
    - 21-30%: Orange (challenging)

Visual comparison:
┌───────────────────────────────────────┐
│ Current:  400L/day  ━━━━━━━━━━━ 100% │
│ Target:   340L/day  ━━━━━━━━    85%  │
│ Savings:  60L/day   ━━          15%  │
└───────────────────────────────────────┘

Impact preview (same style as before)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FOR "CATEGORY-SPECIFIC":

Category Selection (dropdown or radio):
○ Bathroom
○ Kitchen
○ Garden/Outdoor

Target Input (same slider style):
- "Reduce bathroom usage by: 20%"
- Current: 180L/day
- Target: 144L/day

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 3 - GOAL DURATION:

Label: "Goal Duration" (16px medium)

Quick Select Buttons (horizontal):
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│ 7 Days │ │30 Days │ │60 Days │ │Custom  │
└────────┘ └────────┘ └────────┘ └────────┘

- Active: Blue background, white text
- Inactive: White background, gray border

If "Custom" selected:
- Date range picker appears
- Start date: Today (auto)
- End date: Date picker

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 4 - REMINDERS (optional):

Label: "Reminders & Notifications"

Checkboxes:
☑ Daily progress notifications (9:00 AM)
☑ Milestone alerts (25%, 50%, 75%, 100%)
☐ Weekly summary email
☐ Alert when approaching limit

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MODAL FOOTER:
- Background: #F9FAFB (light gray)
- Padding: 24px 32px
- Border top: 1px solid #E5E7EB

Buttons (right-aligned, horizontal):
- "Cancel" button:
  • Background: White
  • Border: 2px solid #E5E7EB
  • Text: #6B7280
  • Size: 48px height
  • Padding: 12px 24px
  
- "Create Goal" / "Set Goal" button:
  • Background: Blue gradient (#0066CC to #0055AA)
  • Text: White, 16px bold
  • Size: 52px height
  • Padding: 16px 32px
  • Icon: Checkmark (left)
  • Hover: Lift effect
  • Disabled state (if invalid): Gray background

Success message (after creation):
- Modal content fades out
- Success checkmark animation (green circle, scale up)
- Text: "Goal Created Successfully! 🎉"
- Auto-close after 2 seconds or "View Goal" button

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FOR "SET THIS GOAL" (from recommended goals):

Same modal but pre-filled:
- Goal type: Auto-selected based on recommendation
- Target: Pre-filled (e.g., "8 minutes" for shower goal)
- Duration: Default to 30 days
- User can still modify all fields
- Title: "Set Recommended Goal"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FIX 3: SETTINGS PAGES - DEVELOP MISSING SECTIONS

Based on the marked sections in Settings sidebar, create these pages:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SETTINGS PAGE 1: PROFILE
(Already exists - just ensure it's complete)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SETTINGS PAGE 2: SECURITY
Canvas: Main content area (same layout as other settings)

HEADING: "Security" (28px bold)
Subtext: "Manage your account security and authentication"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 1 - PASSWORD:
Card background, 24px padding

"Change Password" (20px bold)

Form fields (vertical stack):
1. Current Password:
   - Input type: password
   - Placeholder: "Enter current password"
   - Eye icon (toggle show/hide)

2. New Password:
   - Input type: password
   - Placeholder: "Enter new password"
   - Password strength meter below:
     • Weak (red bar, 33%)
     • Medium (yellow bar, 66%)
     • Strong (green bar, 100%)
   - Requirements list:
     ✓ At least 8 characters
     ✓ Contains uppercase letter
     ✓ Contains number
     ✗ Contains special character

3. Confirm New Password:
   - Input type: password
   - Placeholder: "Re-enter new password"
   - Checkmark appears when matches

"Update Password" button (blue, disabled until valid)
"Last changed: Jan 15, 2026" (small gray text)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 2 - TWO-FACTOR AUTHENTICATION:
Card background

"Two-Factor Authentication (2FA)" (20px bold)
Status badge: "Disabled" (gray pill) or "Enabled" (green pill)

Description:
"Add an extra layer of security to your account by requiring 
a verification code in addition to your password."

IF DISABLED:
- "Enable 2FA" button (outlined blue)

IF ENABLED:
- "Your account is protected with 2FA" (green text with shield icon)
- "Backup codes: 8 remaining" (info text)
- Buttons:
  • "View Backup Codes" (outlined)
  • "Disable 2FA" (red text, small)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 3 - LOGIN SESSIONS:
Card background

"Active Sessions" (20px bold)
"Manage devices where you're currently logged in"

Session list (each session is a card):
┌─────────────────────────────────────────────────────┐
│ 💻 Chrome on Windows                    [Current]   │
│ Karachi, Pakistan                                   │
│ Last active: Just now • IP: 192.168.1.1            │
│                                      [Sign Out]     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ 📱 Safari on iPhone                                 │
│ Karachi, Pakistan                                   │
│ Last active: 2 hours ago • IP: 192.168.1.45        │
│                                      [Sign Out]     │
└─────────────────────────────────────────────────────┘

"Sign Out All Other Sessions" button (outlined red)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 4 - LOGIN HISTORY:
Card background

"Recent Login Activity" (20px bold)

Table showing last 10 logins:
| Date & Time           | Device      | Location    | Status  |
|----------------------|-------------|-------------|---------|
| Mar 2, 2026 9:34 AM  | Chrome/Win  | Karachi, PK | ✓ Success|
| Mar 1, 2026 8:15 PM  | iPhone      | Karachi, PK | ✓ Success|
| Feb 29, 2026 10:22AM | Chrome/Win  | Karachi, PK | ✓ Success|

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SETTINGS PAGE 3: NOTIFICATIONS
Canvas: Main content area

HEADING: "Notification Preferences" (28px bold)
Subtext: "Choose what updates you want to receive"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 1 - PUSH NOTIFICATIONS:
Card background

"Push Notifications" (20px bold)

Toggle list (each item has toggle switch on right):

┌─────────────────────────────────────────────────────┐
│ 🚨 Leak Alerts                              [ON]    │
│ Immediate notification when leak detected           │
│ Cannot be disabled (critical alert)                 │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ 📊 Daily Summary                            [ON]    │
│ Daily usage report at 9:00 PM                      │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ 🎯 Goal Updates                             [ON]    │
│ Progress notifications and milestones               │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ 💡 AI Insights                              [OFF]   │
│ Smart recommendations and tips                      │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ 🌧️ Weather Alerts                          [ON]    │
│ Rain forecasts and watering suggestions             │
└─────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 2 - EMAIL NOTIFICATIONS:
Card background

"Email Notifications" (20px bold)
"Sent to: sarah.ahmed@email.com" (gray text)

Toggle list:
☑ Weekly usage reports (Sundays at 8:00 AM)
☑ Monthly summary (1st of each month)
☑ Goal achievements
☐ Product updates and news
☐ Water-saving tips and blog posts
☐ Marketing emails

"Unsubscribe from all emails" (small red link)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 3 - QUIET HOURS:
Card background

"Quiet Hours" (20px bold)
"Pause non-critical notifications during these times"

Toggle: [ON]

When enabled:
- Start time: 10:00 PM (dropdown)
- End time: 7:00 AM (dropdown)
- "Apply to all days" checkbox
- Or select specific days (checkboxes for Mon-Sun)

Note: "Leak alerts will still come through during quiet hours"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SETTINGS PAGE 4: UNITS & DISPLAY

HEADING: "Units & Display Preferences" (28px bold)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 1 - MEASUREMENT UNITS:
Card background

"Measurement Units" (20px bold)

Volume:
- Radio buttons in a row:
  ● Liters (L)
  ○ Gallons (gal)
  ○ Cubic Meters (m³)

Temperature:
- Toggle: Celsius ⟷ Fahrenheit

Currency:
- Dropdown: Pakistani Rupee (₨ PKR)
- Other options: USD, EUR, GBP, etc.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 2 - DATE & TIME:
Card background

"Date & Time Format" (20px bold)

Date Format:
- Dropdown options:
  • DD/MM/YYYY (02/03/2026)
  • MM/DD/YYYY (03/02/2026)
  • YYYY-MM-DD (2026-03-02)

Time Format:
- Radio: 
  ● 12-hour (9:34 AM)
  ○ 24-hour (09:34)

Timezone:
- Dropdown: (UTC+5) Pakistan Standard Time
- "Auto-detect timezone" checkbox

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 3 - LANGUAGE:
Card background

"Language & Region" (20px bold)

Language:
- Dropdown with flags:
  🇬🇧 English
  🇵🇰 اردو (Urdu)
  🇦🇪 العربية (Arabic)

Region:
- Dropdown: Pakistan
- Affects: Date formats, currency defaults

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 4 - DASHBOARD DISPLAY:
Card background

"Dashboard Preferences" (20px bold)

Default View:
- Radio:
  ● This Week
  ○ This Month
  ○ Last 30 Days

Chart Type:
- Dropdown: Line Chart / Bar Chart / Area Chart

Show on Dashboard:
- Checkboxes:
  ☑ Usage breakdown by category
  ☑ AI insights panel
  ☑ Weekly overview chart
  ☑ Comparison to last month
  ☐ Community ranking
  ☑ Weather forecast

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SETTINGS PAGE 5: GOALS & ALERTS

HEADING: "Goals & Alerts Settings" (28px bold)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 1 - GOAL DEFAULTS:
Card background

"Default Goal Settings" (20px bold)

Default Goal Duration:
- Dropdown: 30 Days / 60 Days / 90 Days / Custom

Auto-Create Goals:
- Toggle: [OFF]
- When ON: "Automatically suggest goals based on usage patterns"

Goal Difficulty Preference:
- Radio:
  ○ Conservative (10% reduction targets)
  ● Moderate (15-20% reduction targets)
  ○ Aggressive (25%+ reduction targets)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 2 - ALERT THRESHOLDS:
Card background

"Custom Alert Thresholds" (20px bold)

High Usage Alert:
- "Alert me when daily usage exceeds:"
- Input: 450 L (with +/- controls)
- Current baseline: 400L

Leak Detection Sensitivity:
- Slider: Low - Medium - High
- Description: "Higher sensitivity may cause more false alerts"

Unusual Pattern Alert:
- Toggle: [ON]
- "Notify about unexpected usage patterns (e.g., night usage)"

Cost Alert:
- "Alert when monthly bill will exceed:"
- Input: ₨4,000
- Based on current rates

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 3 - REMINDER FREQUENCY:
Card background

"Reminder Frequency" (20px bold)

Goal Progress Reminders:
- Dropdown: Daily / Every 3 Days / Weekly / Never

Milestone Notifications:
- Checkboxes:
  ☑ 25% progress
  ☑ 50% progress
  ☑ 75% progress
  ☑ 100% completion
  ☐ Exceeded goal

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SETTINGS PAGE 6: PRIVACY

HEADING: "Privacy & Data" (28px bold)
Subtext: "Control how your data is used and shared"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 1 - DATA COLLECTION:
Card background

"Data Collection & Usage" (20px bold)

Toggle list:
☑ Usage analytics for personalized insights
  "Allows AI to provide better recommendations"

☑ Performance & crash reporting
  "Helps us improve the app"

☐ Anonymized community benchmarking
  "Compare your usage with similar households (no personal data shared)"

☐ Marketing & product research
  "Opt-in to surveys and feature testing"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 2 - DATA SHARING:
Card background

"Third-Party Sharing" (20px bold)

"FlowSense never sells your personal data. The toggles below 
control optional integrations."

☐ Share data with water utility provider
  "Enable automatic bill sync (requires account number)"

☐ Weather service integration
  "Share location for weather-based watering suggestions"

☐ Smart home integration
  "Connect with Google Home, Alexa, etc."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 3 - DATA EXPORT & DELETION:
Card background

"Your Data Rights" (20px bold)

"Download Your Data" button (outlined blue)
"Get a copy of all your usage data in JSON format"

"Delete My Account" button (outlined red)
"Permanently delete your account and all associated data"
Warning icon + "This action cannot be undone"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 4 - PRIVACY POLICY:
Links:
- "View Privacy Policy" (blue link)
- "View Terms of Service" (blue link)
- Last updated: January 1, 2026

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SETTINGS PAGE 7: SENSORS

HEADING: "Sensor Management" (28px bold)
Subtext: "Configure and monitor your water sensors"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 1 - CONNECTED SENSORS:
Card background

"Connected Sensors" (20px bold)
"+ Add New Sensor" button (top-right, outlined blue)

Sensor list (each sensor is a card):

┌─────────────────────────────────────────────────────┐
│ 🚿 BATHROOM SHOWER                        [Active] │
│ Sensor ID: BS-001                                   │
│ Location: Main Bathroom                             │
│ Last reading: 2 min ago • Battery: 85%             │
│ Status: ● Online                                   │
│                            [Configure] [Remove]     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ 🚽 BATHROOM TOILET                        [Active] │
│ Sensor ID: BT-001                                   │
│ Location: Main Bathroom                             │
│ Last reading: 30 sec ago • Battery: 92%            │
│ Status: ● Online                                   │
│                            [Configure] [Remove]     │
└─────────────────────────────────────────────────────┘

Status indicators:
● Online (green)
● Offline (gray)
⚠️ Low Battery (yellow)
❌ Error (red)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 2 - SENSOR CALIBRATION:
Card background

"Calibration" (20px bold)

"Last calibrated: February 15, 2026"

"Calibrate All Sensors" button (outlined blue)
"Recommended every 3 months"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 3 - SIMULATED MODE:
Card background (with info banner)

Info banner (light blue background):
"ℹ️ Currently using simulated sensor data for demonstration. 
Connect real sensors to begin live monitoring."

"Exit Demo Mode" button
OR
"Connect Real Sensors" button (blue)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SETTINGS PAGE 8: INTEGRATIONS

HEADING: "Integrations & Connections" (28px bold)
Subtext: "Connect FlowSense with other services"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AVAILABLE INTEGRATIONS (grid of cards):

┌─────────────────────────────────────────┐
│  [Google Home Logo]                     │
│  Google Home                            │
│  Control with voice commands            │
│  Status: Not Connected                  │
│                      [Connect]          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  [Alexa Logo]                           │
│  Amazon Alexa                           │
│  Smart home integration                 │
│  Status: Not Connected                  │
│                      [Connect]          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  [IFTTT Logo]                           │
│  IFTTT                                  │
│  Create custom automations              │
│  Status: Connected ✓                    │
│                  [Configure]            │
└─────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ALL SETTINGS PAGES - COMMON FOOTER:
- "Save Changes" button (blue, right)
- "Cancel" button (gray, right)
- "Saved successfully ✓" message (green, fades after 2 seconds)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DESIGN SPECIFICATIONS:

All setting pages use:
- Card background: White
- Card padding: 24px
- Card border: 1px solid #E5E7EB
- Card border radius: 12px
- Spacing between sections: 24px
- Section headings: 20px bold, #1F2937
- Body text: 14px regular, #6B7280
- Input height: 44px
- Toggle switch: 48px × 28px
- Buttons: Same specs as defined earlier

Make all pages consistent with existing Settings sidebar navigation.