async function run() {
  const url = 'https://generativelanguage.googleapis.com/v1beta/models?key=YOUR_API_KEY_HERE';
  const response = await fetch(url);
  const data = await response.json();
  data.models.forEach(m => {
    if (m.name.includes('flash')) console.log(m.name);
  });
}
run();
