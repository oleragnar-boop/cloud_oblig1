const deleteButton = document.getElementById("deleteButton");

deleteButton.addEventListener('click', _ => {
    let currentid = parseInt(req.query.searchid);
fetch('/data', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      student_id: currentid
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(data => {
      window.location.reload()
    })
})