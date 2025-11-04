# Google Sheets Waitlist Setup Guide

## Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet called "Meikai Waitlist"
3. In the first row, add these headers:
   - A1: `Email`
   - B1: `Timestamp`
   - C1: `Status`

## Step 2: Set Up Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any code in the editor and paste this:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    const email = data.email;
    const timestamp = data.timestamp || new Date().toISOString();

    // Check if email already exists
    const emails = sheet.getRange('A:A').getValues();
    const emailExists = emails.some(row => row[0] === email);

    if (emailExists) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: 'Email already registered'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Append the new row
    sheet.appendRow([email, timestamp, 'Active']);

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Successfully added to waitlist'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput('Meikai Waitlist API is running');
}
```

3. Click **Save** (disk icon)
4. Click **Deploy** → **New deployment**
5. Click the gear icon next to "Select type" and choose **Web app**
6. Configure:
   - Description: "Meikai Waitlist"
   - Execute as: **Me**
   - Who has access: **Anyone**
7. Click **Deploy**
8. **IMPORTANT**: Copy the Web App URL (it will look like: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`)

## Step 3: Configure Your Project

### Option A: Direct Integration (Simple - No Backend Needed)

This is the easiest approach. The frontend will directly call the Google Apps Script.

1. Update your `.env` or `.env.local` file:
```
VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

2. Use the updated `App.jsx` provided

### Option B: Using Serverless Backend (More Secure)

If you deploy to Vercel/Netlify and want to hide the Google Sheets URL:

1. Add environment variable in your hosting platform:
```
GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

2. Deploy the `api/waitlist.js` endpoint

## Step 4: Test Your Setup

1. Run your dev server: `npm run dev`
2. Try submitting an email through the form
3. Check your Google Sheet - you should see the email appear!

## Troubleshooting

- **CORS errors**: Make sure the Apps Script is deployed with "Anyone" access
- **Not saving**: Check that the Apps Script deployment is the latest version
- **Duplicate prevention**: The script automatically prevents duplicate emails
