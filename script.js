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
        fullName: this.querySelectorAll('input')[0].value,
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
        alert('Application submitted successfully!');
        this.reset();
        btn.innerText = "Submit Application";
        btn.disabled = false;
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
        fullName: this.querySelectorAll('input')[0].value,
        phone: this.querySelectorAll('input')[1].value,
        email: this.querySelectorAll('input')[2].value,
        interest: this.querySelector('select').value
    };

    fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
        alert('Volunteer registration successful!');
        this.reset();
        btn.innerText = "Join as Volunteer";
        btn.disabled = false;
    })
    .catch(err => {
        alert('Error submitting form. Please try again.');
        btn.innerText = "Join as Volunteer";
        btn.disabled = false;
    });
});

