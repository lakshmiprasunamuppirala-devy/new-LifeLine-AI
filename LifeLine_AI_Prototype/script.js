const form=document.getElementById('incidentForm');
const emptyState=document.getElementById('emptyState');
const results=document.getElementById('results');
const status=document.getElementById('status');
const questions=document.getElementById('questions');
const summary=document.getElementById('summary');
const copyStatus=document.getElementById('copyStatus');
const val=id=>document.getElementById(id).value.trim();

form.addEventListener('submit',event=>{
  event.preventDefault();
  const d={type:val('incidentType'),location:val('location'),people:val('people'),urgency:val('urgency'),access:val('access'),obstacles:val('obstacles'),assistance:val('assistance'),details:val('details')};
  const q=[];
  if(!d.people)q.push('How many people are affected, if known?');
  if(!d.urgency||d.urgency==='Not sure')q.push('What is the current condition of the person or people?');
  if(!d.access)q.push('What is the safest or clearest access route for responders?');
  if(!d.obstacles)q.push('Are there road blocks, crowds, fire, water, or other access obstacles?');
  if(!d.assistance||d.assistance==='Not sure yet')q.push('What type of assistance appears to be needed?');
  if(!d.details)q.push('Is there any other important, verified information to share?');
  emptyState.classList.add('hidden');results.classList.remove('hidden');
  status.className='status'+(q.length?'':' complete');
  status.textContent=q.length?`Information check complete. ${q.length} item(s) may need clarification. Confirm facts; do not guess.`:'The main fields are filled in. Verify all details before sharing.';
  questions.replaceChildren();
  (q.length?q:['No obvious missing fields detected. Confirm details and follow instructions from emergency professionals.']).forEach(text=>{const li=document.createElement('li');li.textContent=text;questions.appendChild(li)});
  summary.textContent=['LIFELINE AI — INCIDENT SUMMARY','Educational prototype only — not sent to emergency services','',`Emergency type: ${d.type||'Not provided'}`,`Location / landmark: ${d.location||'Not provided'}`,`People affected: ${d.people||'Unknown'}`,`Current condition: ${d.urgency||'Unknown'}`,`Access route: ${d.access||'Not provided'}`,`Obstacles: ${d.obstacles||'Unknown'}`,`Assistance needed: ${d.assistance||'Not confirmed'}`,`Additional details: ${d.details||'None provided'}`,'','Items to clarify:',...(q.length?q.map(x=>'- '+x):['- No obvious missing fields detected.']),'','If this is a real emergency in India, call 112. Do not delay emergency contact to complete this form.'].join('\n');
  copyStatus.textContent='';
});
document.getElementById('copy').addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(summary.textContent);copyStatus.textContent='Summary copied.'}
  catch(e){const area=document.createElement('textarea');area.value=summary.textContent;document.body.appendChild(area);area.select();const ok=document.execCommand('copy');area.remove();copyStatus.textContent=ok?'Summary copied.':'Copy was blocked. Select and copy the summary manually.'}
});
