document.addEventListener("DOMContentLoaded", () => {
    let participantCount = 1;

    // Function to create participant template
    const participantTemplate = (count) => `
        <section class="participant${count}">
            <p>Participant ${count}</p>
            <div class="item">
                <label for="fname${count}"> First Name<span>*</span></label>
                <input id="fname${count}" type="text" name="fname" value="" required />
            </div>
            <div class="item activities">
                <label for="activity${count}">Activity #<span>*</span></label>
                <input id="activity${count}" type="text" name="activity" />
            </div>
            <div class="item">
                <label for="fee${count}">Fee ($)<span>*</span></label>
                <input id="fee${count}" type="number" name="fee" />
            </div>
            <div class="item">
                <label for="date${count}">Desired Date <span>*</span></label>
                <input id="date${count}" type="date" name="date" />
            </div>
            <div class="item">
                <p>Grade</p>
                <select id="grade${count}">
                    <option selected value="" disabled selected></option>
                    <option value="1">1st</option>
                    <option value="2">2nd</option>
                    <option value="3">3rd</option>
                    <option value="4">4th</option>
                    <option value="5">5th</option>
                    <option value="6">6th</option>
                    <option value="7">7th</option>
                    <option value="8">8th</option>
                    <option value="9">9th</option>
                    <option value="10">10th</option>
                    <option value="11">11th</option>
                    <option value="12">12th</option>
                </select>
            </div>
        </section>
    `;

    // Add Participant button event listener
    document.getElementById("addParticipant").addEventListener("click", () => {
        participantCount++;
        const newParticipantHTML = participantTemplate(participantCount);
        document.getElementById("addParticipant").insertAdjacentHTML("beforebegin", newParticipantHTML);
    });

    // Function to calculate total fees
    const totalFees = () => {
        let feeElements = document.querySelectorAll("[id^=fee]");
        feeElements = [...feeElements];
        return feeElements.reduce((total, feeElement) => total + parseFloat(feeElement.value), 0);
    };

    // Function to create success message template
    const successTemplate = (info) => `
        Thank you ${info.adultName} for registering. You have registered ${info.participantCount} participants and owe $${info.feeTotal} in fees.
    `;

    document.getElementById("registrationForm").addEventListener("submit", (event) => {
        event.preventDefault();

        const adultName = document.getElementById("adult_name").value;
        const feeTotal = totalFees();
        const participantCount = document.querySelectorAll("[class^=participant]").length;

        document.getElementById("registrationForm").style.display = "none";
        document.getElementById("summary").innerHTML = successTemplate({ adultName, participantCount, feeTotal });
        document.getElementById("summary").style.display = "block";
    });
});
