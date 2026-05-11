Create a modern, user-friendly registration and household setup flow for 
"FlowSense" - an AI-powered water management web application. Design a 
multi-step onboarding process optimized for desktop (1440px width).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OVERALL DESIGN STYLE:
- Modern, clean, welcoming aesthetic
- Color Palette:
  Primary Blue: #0066CC
  Light Blue: #E3F2FD (backgrounds)
  Accent Aqua: #00D4FF
  Success Green: #00C853
  Text Dark: #1F2937
  Text Gray: #6B7280
  Background: #F9FAFB

- Typography:
  Headers: Inter or Poppins (Bold, 28-36px)
  Body: Inter (Regular, 16px)
  Labels: Inter (Medium, 14px)

- Spacing: Consistent 24px padding
- Border Radius: 12px for cards, 8px for inputs
- Shadows: Subtle (0 2px 12px rgba(0,0,0,0.08))

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SCREEN 1: SIGN UP - BASIC ACCOUNT INFO
Canvas Size: 1440px × 900px

Layout: Split Screen Design

LEFT SIDE (40% - Blue gradient background):
- FlowSense logo (top, white)
- Large water droplet illustration (centered, animated)
- Tagline: "Welcome to Smarter Water Management"
- 3 feature highlights with icons:
  ✓ Track usage in real-time
  ✓ AI-powered insights
  ✓ Save water & money
- Bottom: "Already have an account? Login" link (white)

RIGHT SIDE (60% - White background):
- Centered card (550px width, elevated shadow)

CARD HEADER:
- "Create Your Account" (32px bold, #1F2937)
- Subtext: "Join thousands saving water every day" (16px, #6B7280)
- Progress indicator at top: "Step 1 of 3" (small pill badge, light blue)

FORM FIELDS (vertical stack, 16px gap):

1. Full Name Input:
   - Label: "Full Name" (14px medium)
   - Placeholder: "Enter your full name"
   - Icon: User icon (left side)
   - Border: 1px #E5E7EB, rounded 8px
   - Height: 48px
   - Focus state: Blue border, subtle shadow

2. Email Input:
   - Label: "Email Address"
   - Placeholder: "you@example.com"
   - Icon: Envelope icon
   - Validation indicator space (right side)

3. Phone Number Input:
   - Label: "Phone Number"
   - Country code dropdown: "+92" (Pakistan flag icon)
   - Placeholder: "300 1234567"
   - Icon: Phone icon

4. Password Input:
   - Label: "Create Password"
   - Placeholder: "Minimum 8 characters"
   - Icon: Lock icon (left)
   - Eye icon (right, toggle show/hide)
   - Password strength indicator below:
     Bar progress (weak=red, medium=yellow, strong=green)

5. Confirm Password Input:
   - Label: "Confirm Password"
   - Placeholder: "Re-enter your password"
   - Checkmark icon appears when match

TERMS AGREEMENT:
- Checkbox: "I agree to Terms of Service and Privacy Policy"
- Links underlined in blue

BOTTOM ACTIONS:
- "Continue" button (full width, 52px height, blue, bold)
  - Disabled state (gray) until form valid
  - Enabled state (blue gradient)
- Small text: "Secure & encrypted" with lock icon

SOCIAL SIGNUP (Optional divider "or"):
- "Sign up with Google" button (white, Google icon)
- "Sign up with Facebook" button (white, Facebook icon)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SCREEN 2: HOUSEHOLD PROFILE SETUP
Canvas Size: 1440px × 900px

Layout: Same split screen design

LEFT SIDE: Same as Screen 1 but with different illustration
- Illustration: House with water droplets
- Text: "Tell us about your home"

RIGHT SIDE CARD:
- Header: "Set Up Your Household Profile"
- Subtext: "Help us personalize your water insights"
- Progress: "Step 2 of 3"

FORM SECTIONS:

SECTION 1 - BASIC INFO (card with light blue background):
Heading: "Basic Information"

1. Property Type (Radio buttons in grid, 2 columns):
   ○ House (icon: house)
   ○ Apartment (icon: building)
   ○ Villa (icon: large house)
   ○ Commercial (icon: office)
   - Selected state: Blue border, blue background

2. Number of Residents (Counter input):
   - Label: "How many people live in your household?"
   - Minus button | Number display "4" | Plus button
   - Visual: Person icons multiply (1-10 people)

3. Property Size (Dropdown):
   - Label: "Approximate property size"
   - Options: 
     • Small (< 1000 sq ft)
     • Medium (1000-2000 sq ft)
     • Large (2000-3000 sq ft)
     • Very Large (> 3000 sq ft)

SECTION 2 - WATER USAGE AREAS (card, spacing above):
Heading: "Water Usage Areas"
Subtext: "Select all areas that apply to your property"

BATHROOMS:
- Label: "Bathrooms" (icon: shower)
- Counter: Minus | "2" | Plus
- Expandable details (chevron down):
  When expanded shows:
  • Number of showers: Counter (2)
  • Number of bathtubs: Counter (1)
  • Number of toilets: Counter (3)
  • Number of sinks: Counter (2)

KITCHEN:
- Label: "Kitchen" (icon: faucet)
- Toggle switch: ON/OFF
- When ON, shows:
  • Number of sinks: Counter (1)
  • Dishwasher: Toggle (Yes/No)
  • Washing machine location:
    Radio: ○ In kitchen  ○ Separate area

LAUNDRY:
- Label: "Laundry Area" (icon: washing machine)
- Toggle: ON/OFF
- When ON:
  • Washing machine: Toggle
  • Utility sink: Toggle

OUTDOOR/GARDEN:
- Label: "Outdoor/Garden Area" (icon: plant/tree)
- Toggle: ON/OFF
- When ON shows:
  • Garden size: Dropdown (Small/Medium/Large)
  • Lawn area: Toggle
  • Swimming pool: Toggle
  • Car wash area: Toggle
  • Outdoor taps: Counter

ADDITIONAL AREAS:
- Label: "Other Water Usage Areas"
- Checkbox list:
  ☐ Basement bathroom/sink
  ☐ Guest house
  ☐ Garage with water connection
  ☐ Prayer area (Wudu area)
  ☐ Pet washing area

VISUAL SUMMARY PANEL (right sidebar, 280px):
- "Your Setup Summary" heading
- Icon grid showing selected areas:
  🚿 2 Bathrooms
  🚰 Kitchen
  🌳 Garden (Medium)
  👥 4 People
- Total estimated daily usage: "~400L" (calculated)

BOTTOM ACTIONS:
- "Back" button (left, outlined, gray)
- "Continue" button (right, blue, primary)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SCREEN 3: WATER UTILITY & PREFERENCES
Canvas Size: 1440px × 900px

Layout: Same split screen

LEFT SIDE:
- Illustration: Water meter, bills, coins
- Text: "Almost there! Just a few more details"

RIGHT SIDE CARD:
- Header: "Water Utility Information"
- Subtext: "This helps us provide accurate cost estimates"
- Progress: "Step 3 of 3"

FORM SECTIONS:

SECTION 1 - UTILITY PROVIDER:
1. Water Provider (Dropdown with search):
   - Label: "Your water utility provider"
   - Placeholder: "Select or type to search..."
   - Common options:
     • Karachi Water & Sewerage Board (KWSB)
     • Lahore Water & Sanitation Agency (LWASA)
     • Islamabad Water Supply
     • Other (Custom input)

2. Account Number (Optional):
   - Label: "Water meter account number (optional)"
   - Placeholder: "Enter if available"
   - Helper text: "This helps pre-fill your bills"

3. Billing Cycle:
   - Label: "When do you receive your water bill?"
   - Radio buttons:
     ○ Monthly - 1st of month
     ○ Monthly - 15th of month
     ○ Bi-monthly
     ○ Other (date picker)

SECTION 2 - RATE STRUCTURE:
1. Pricing Type (Radio cards with descriptions):
   ○ Flat Rate
     "Fixed cost per month regardless of usage"
     Input: "Amount: ₨____/month"
   
   ○ Tiered Pricing (default)
     "Cost increases with higher usage brackets"
     Show example tiers:
     0-10,000L: ₨4/L
     10,001-20,000L: ₨6/L
     20,001+: ₨8/L
   
   ○ Not Sure
     "We'll help you figure it out later"

SECTION 3 - PREFERENCES:
1. Display Units (Toggle group):
   - Volume: Liters ⟷ Gallons
   - Temperature: Celsius ⟷ Fahrenheit
   - Currency: PKR (Rupees) (dropdown for other currencies)

2. Language Preference:
   - Dropdown: English / اردو (Urdu)

3. Notifications (Toggles):
   ☑ Leak alerts (always ON, can't disable)
   ☑ Daily usage summary
   ☑ Weekly reports
   ☑ Goal reminders
   ☐ Marketing emails

SECTION 4 - GOALS (Optional):
- "Would you like to set an initial water-saving goal?"
- Info text: "Don't worry, you can change this later"
- Suggested goal slider:
  • "Reduce usage by: 10%" (slider 5% to 30%)
  • Estimated target: "360L/day (currently ~400L)"
- Checkbox: "Skip for now, I'll set goals later"

BOTTOM SECTION:
- Privacy notice card (light blue background):
  🔒 Icon
  "Your data is encrypted and never shared without permission.
  Read our Privacy Policy"

BOTTOM ACTIONS:
- "Back" button (left, outlined)
- "Complete Setup" button (right, blue gradient, larger)
  - Loading state: Spinner + "Setting up your account..."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SCREEN 4: SETUP COMPLETE / WELCOME
Canvas Size: 1440px × 900px

Layout: Full-screen centered

CENTERED CARD (600px width):
- Large checkmark icon in circle (green, animated)
- "Welcome to FlowSense!" (40px bold)
- User's name: "Hi Sarah! Your account is ready" (24px)

SUCCESS MESSAGE:
"We've analyzed your household setup and here's what we found:"

SUMMARY CARDS (3 columns):
CARD 1:
- Icon: House
- "Your Home"
- "4 people, 2 bathrooms"
- "Medium-sized property"

CARD 2:
- Icon: Target
- "Estimated Usage"
- "~400L daily"
- "12,000L monthly"

CARD 3:
- Icon: Lightbulb
- "Savings Potential"
- "Up to 120L/day"
- "₨720/month"

NEXT STEPS SECTION:
"What happens next?"
1. ✓ We'll start monitoring your usage
2. ✓ AI will learn your patterns (7-14 days)
3. ✓ You'll receive personalized insights
4. ✓ Set goals and track progress

QUICK TIPS CARD:
- "Pro Tips for Getting Started"
- • Check your dashboard daily
- • Enable leak alerts
- • Set your first goal
- • Explore the AI chatbot

BOTTOM ACTIONS (centered):
- "Take a Quick Tour" button (outlined blue)
- "Go to Dashboard" button (primary blue, larger)

SKIP OPTION:
- Small link: "I'll explore on my own" → Goes directly to dashboard

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BONUS SCREEN: LOGIN PAGE (for returning users)
Canvas Size: 1440px × 900px

Layout: Same split screen as signup

LEFT SIDE:
- Logo and branding
- "Welcome Back!" heading
- Rotating water-saving tip:
  "💡 Tip: Most households waste 30% of water. 
  FlowSense helps you track every drop."

RIGHT SIDE CARD (450px width):
- "Login to Your Account" (28px bold)

FORM:
1. Email/Phone Input:
   - Label: "Email or Phone Number"
   - Placeholder: "Enter your email or phone"
   - Icon: User

2. Password Input:
   - Label: "Password"
   - Placeholder: "Enter your password"
   - Eye icon (toggle)
   - "Forgot Password?" link (right-aligned, small, blue)

3. Remember Me Checkbox

LOGIN BUTTON:
- "Login" (full width, blue)

DIVIDER: "or"

SOCIAL LOGIN:
- "Continue with Google"
- "Continue with Facebook"

SIGNUP LINK:
- "Don't have an account? Sign Up" (centered, blue)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMPONENT SPECIFICATIONS:

FORM INPUTS:
- Height: 48px
- Padding: 12px 16px
- Border: 1px solid #E5E7EB
- Border radius: 8px
- Font size: 16px
- Focus state: 
  • Border: #0066CC (2px)
  • Shadow: 0 0 0 3px rgba(0,102,204,0.1)
- Error state:
  • Border: #FF3B30
  • Helper text in red below
- Success state:
  • Border: #00C853
  • Checkmark icon (right)

BUTTONS:
Primary:
- Background: Linear gradient (#0066CC to #0055AA)
- Text: White, 16px bold
- Height: 52px
- Border radius: 8px
- Hover: Lift 2px, deeper shadow
- Disabled: #E5E7EB background, gray text

Secondary:
- Background: White
- Border: 2px solid #0066CC
- Text: #0066CC, 16px bold
- Hover: Light blue background

COUNTERS:
- 3 elements: Minus button | Number | Plus button
- Each 40px × 40px
- Minus/Plus: Light gray background, hover blue
- Number: Center-aligned, 18px bold

TOGGLES:
- Width: 48px
- Height: 28px
- ON state: Blue background, white circle (right)
- OFF state: Gray background, white circle (left)
- Smooth animation: 200ms ease

PROGRESS INDICATOR (Steps 1/2/3):
- 3 dots connected by lines
- Completed: Blue filled circle with checkmark
- Current: Blue outlined circle, pulsing
- Upcoming: Gray circle
- Line connecting: Blue (done), Gray (not done)

VALIDATION STATES:
Real-time validation:
- Email: Valid format check, show checkmark
- Password: Strength meter (weak/medium/strong)
- Phone: Format validation for selected country
- Required fields: Show asterisk (*)

ERROR MESSAGES:
- Appear below field
- Red text, 14px
- Icon: Warning triangle
- Examples:
  "Please enter a valid email address"
  "Password must be at least 8 characters"
  "This field is required"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RESPONSIVE CONSIDERATIONS:
- Mobile: Stack vertically, hide left illustration panel
- Tablet: Reduce left panel to 30% width
- Desktop: Full split screen as shown

ACCESSIBILITY:
- Tab order: Logical top-to-bottom, left-to-right
- Focus indicators: Clear blue outline
- ARIA labels: All form inputs
- Keyboard shortcuts: Enter to submit
- Screen reader: Announce validation errors

ANIMATIONS:
- Page transitions: Slide left/right (300ms)
- Input focus: Smooth border color change (200ms)
- Button hover: Lift effect (150ms)
- Success checkmark: Scale + rotate animation (500ms)
- Counter changes: Number flip animation (300ms)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DATA STRUCTURE (for developers):

User Profile Object to be created:
{
  // Step 1
  fullName: "Sarah Ahmed",
  email: "sarah@example.com",
  phone: "+923001234567",
  password: "hashed_password",
  
  // Step 2 - Household
  propertyType: "house",
  residents: 4,
  propertySize: "medium",
  
  waterAreas: {
    bathrooms: {
      count: 2,
      showers: 2,
      bathtubs: 1,
      toilets: 3,
      sinks: 2
    },
    kitchen: {
      enabled: true,
      sinks: 1,
      dishwasher: true,
      washingMachine: false
    },
    laundry: {
      enabled: true,
      washingMachine: true,
      utilitySink: false
    },
    outdoor: {
      enabled: true,
      gardenSize: "medium",
      lawn: true,
      pool: false,
      carWash: false,
      outdoorTaps: 2
    },
    additional: ["wudu_area"]
  },
  
  // Step 3 - Utility
  waterProvider: "KWSB",
  accountNumber: "optional",
  billingCycle: "monthly_1st",
  rateStructure: "tiered",
  
  preferences: {
    units: {
      volume: "liters",
      temperature: "celsius",
      currency: "PKR"
    },
    language: "english",
    notifications: {
      leakAlerts: true,
      dailySummary: true,
      weeklyReports: true,
      goalReminders: true,
      marketing: false
    }
  },
  
  initialGoal: {
    enabled: true,
    reductionPercent: 10,
    targetDaily: 360
  },
  
  estimatedUsage: {
    dailyBaseline: 400,
    monthlyBaseline: 12000
  },
  
  createdAt: "2026-03-02T10:30:00Z"
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DESIGN NOTES:
- Use consistent 24px spacing between sections
- All cards have 12px border radius
- Maintain 1.5 line height for readability
- Use icons from Heroicons or Lucide React
- Ensure high contrast (4.5:1 minimum)
- Test with real data, not Lorem Ipsum
- Include empty states and loading states
- Show helpful examples and tooltips
- Make form feel conversational, not interrogative
- Celebrate completion with animation