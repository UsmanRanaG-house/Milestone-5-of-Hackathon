document.getElementById('resumeForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    // Declaration
    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLInputElement;
    const experienceElement = document.getElementById('experience') as HTMLInputElement;
    const skillsElement = document.getElementById('skills') as HTMLInputElement;
    const usernameElement = document.getElementById('username') as HTMLInputElement;






    // Assignment & Deployment
    if (profilePictureInput && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement && usernameElement) {





        const name = nameElement.value;
        const phone = phoneElement.value;
        const email = emailElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;
        const username = usernameElement.value;
        const uniquePath = `resume/${username.replace(/\s+/g, '_')}_cv.html`;
        const profilePictureFile = profilePictureInput.files?.[0];
        const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';






        const resumeOutput = `
            <h2>Resume</h2>
            ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ""}
            <p><strong>Name:</strong> <span id="editable-name" class="editable">${name}</span></p>
            <p><strong>Email:</strong><span id="editable-email" class="editable">${email}</span></p>
            <p><strong>Phone:</strong> <span id="editable-phone" class="editable">${phone}</span></p>
            <h3>Education</h3>
            <p id="editable-education" class="editable">${education}</p>
            <h3>Experience</h3>
            <p id="editable-experience" class="editable">${experience}</p>
            <h3>Skills</h3>
            <p id="editable-skills" class="editable">${skills}</p>`;





        const downloadLink = document.createElement('a');
        downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeOutput);
        downloadLink.download = uniquePath;
        downloadLink.textContent = 'Download Your Resume';
        downloadLink.classList.add('download-link');



        
        const resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            resumeOutputElement.appendChild(downloadLink);
            makeEditable();
            resumeOutputElement.classList.remove("hidden");

            const buttonsContainer = document.createElement("div");
            buttonsContainer.id = "buttonsContainer";
            resumeOutputElement.appendChild(buttonsContainer);





            // Sharable link button
            const shareLinkButton = document.createElement("button");
            shareLinkButton.textContent = "Copy Sharable Link";

            shareLinkButton.style.height = "40px";  // Set height
            shareLinkButton.style.width = "232px";  // Set width

            shareLinkButton.addEventListener("click", async () => {
                try {
                    const shareLink = `https://yourdomain.com/resumes/${name.replace(/\s+/g, "_")}_cv.html`;



                await navigator.clipboard.writeText(shareLink);
                alert("Sharable link copied to the clipboard!");
                } catch (error) {
                    console.error('Failed to copy the link:', error);
                    alert("Failed to copy link to clipboard.Please try again")
                }
            });

            buttonsContainer.appendChild(shareLinkButton);
        }
    } else {
        console.error('One or more required fields are missing');
    }
});




// Making Editable
function makeEditable() {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
        element.addEventListener('click', function() {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "";

            if (currentElement.tagName === "P" || currentElement.tagName === 'SPAN') {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = currentValue;
                input.classList.add('editable-input');

                input.addEventListener('blur', function() {
                    currentElement.textContent = input.value;
                    input.remove();
                    currentElement.style.display = 'inline';
                });

                currentElement.style.display = 'none';
                currentElement.parentNode?.insertBefore(input, currentElement);
                input.focus();
            }
        });
    });
}
