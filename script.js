const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwxLJrjnN3E5e_qoz_0KVd43jkMsjr5ArsYRbx-g56OVfhZzl0k1HAA4DmCMR7aHyiwdQ/exec";

function switchTab(tabName) {
    const candidateTab = document.getElementById('candidate-tab');
    const volunteerTab = document.getElementById('volunteer-tab');
    const candidateForm = document.getElementById('candidate-form');
    const volunteerForm = document.getElementById('volunteer-form');

    if (tabName === 'candidate') {
        candidateTab.classList.add('active');
        volunteerTab.classList.remove('active');
        candidateForm.classList.add('active');
        volunteerForm.classList.remove('active');
    } else {
        volunteerTab.classList.add('active');
        candidateTab.classList.remove('active');
        volunteerForm.classList.add('active');
        candidateForm.classList.remove('active');
    }
}

// Handle Candidate Form Submission
document.getElementById('candidate-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button');
    btn.innerText = "Submitting...";
    btn.disabled = true;

    const payload = {
        type: 'candidate',
        name: this.querySelectorAll('input')[0].value,
        age: this.querySelectorAll('input')[1].value,
        address: this.querySelectorAll('input')[2].value,
        phone: this.querySelectorAll('input')[3].value,
        email: this.querySelectorAll('input')[4].value
    };

    fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
        this.innerHTML = `
          <div style="text-align: center; padding: 2rem 1rem;">
            <div style="font-size: 3rem; margin-bottom: 0.8rem;">✅</div>
            <h3 style="color: #0052cc; font-size: 1.4rem; margin-bottom: 0.5rem;">Application Received!</h3>
            <p style="color: #4a5568; line-height: 1.5; font-size: 0.95rem;">
              Thank you for applying! We have received your details and will contact you via email shortly.
            </p>
          </div>
        `;
    })
    .catch(err => {
        alert('Error submitting form. Please try again.');
        btn.innerText = "Submit Application";
        btn.disabled = false;
    });
});

// Handle Volunteer Form Submission
document.getElementById('volunteer-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button');
    btn.innerText = "Submitting...";
    btn.disabled = true;

    const payload = {
        type: 'volunteer',
        name: this.querySelectorAll('input')[0].value,
        age: this.querySelectorAll('input')[1].value,
        address: this.querySelectorAll('input')[2].value,
        phone: this.querySelectorAll('input')[3].value,
        email: this.querySelectorAll('input')[4].value
    };

    fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
        this.innerHTML = `
          <div style="text-align: center; padding: 2rem 1rem;">
            <div style="font-size: 3rem; margin-bottom: 0.8rem;">🙌</div>
            <h3 style="color: #0052cc; font-size: 1.4rem; margin-bottom: 0.5rem;">Registration Received!</h3>
            <p style="color: #4a5568; line-height: 1.5; font-size: 0.95rem;">
              Thank you for volunteering with us! We have received your details and will reach out with orientation info shortly.
            </p>
          </div>
        `;
    })
    .catch(err => {
        alert('Error submitting form. Please try again.');
        btn.innerText = "Submit Application";
        btn.disabled = false;
    });
});
