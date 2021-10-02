const PUSHOVER_API_TOKEN = 'ahrep6j8qbfmfxi1aj32o1d1a4snk4'
const PUSHOVER_USER_TOKEN = 'uu9e5rkkruksgeijgcoy7fid7uw8n2'
const MEM_SCHEDULE_URL = 'https://ttp.cbp.dhs.gov/schedulerapi/slots?orderBy=soonest&limit=10&locationId=13621&minimum=1&filterTimestampBy=before&timestamp=2021-12-06'

async function handleScheduled(event) {
  const res = await fetch(MEM_SCHEDULE_URL)
  const schedule = await res.json()

  const hasSpaces = schedule.length > 0

  if (hasSpaces) {
    await sendNotification()
  }
}

async function sendNotification() {
  await fetch('https://api.pushover.net/1/messages.json', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: PUSHOVER_API_TOKEN,
      user: PUSHOVER_USER_TOKEN,
      message: 'New spots available at Memphis Airport!',
        url_title: "Choose slot",
        url: "https://secure.login.gov/openid_connect/authorize?acr_values=http%3A%2F%2Fidmanagement.gov%2Fns%2Fassurance%2Fial%2F1&client_id=urn:gov:dhs:openidconnect.profiles:sp:sso:cbp:pspd-ttp-prod&redirect_uri=https%3A%2F%2Fttp.cbp.dhs.gov%2Flogin&response_type=code&scope=openid+email&nonce=en%3AadruDtmFsDEJN3VSew0wBooqLVBlzMJM&state=en%3AadruDtmFsDEJN3VSew0wBooqLVBlzMJM&locale=en"
    }),
  })
}
