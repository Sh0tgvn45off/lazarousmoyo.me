const modeButtons = document.querySelectorAll('.mode-button');
const startSessionButton = document.getElementById('startSession');
const endSessionButton = document.getElementById('endSession');
const formatButton = document.getElementById('formatButton');
const textDisplayArea = document.getElementById('textDisplayArea');
const downloadFormatSelect = document.getElementById('downloadFormat');
const downloadButton = document.getElementById('downloadButton');
const countdownDisplay = document.getElementById('countdown');
const timerIcon = document.querySelector('.timer-icon');

let recognition;
let currentMode = null;
let fullTranscript = "";
let formattedText = "";
let timerInterval;
let timeLeft;
const sessionDurationSeconds = 90 * 60;


// --- Mode Selection --- (ENSURING BUTTONS ARE CLICKABLE - Correct Implementation)
modeButtons.forEach(button => {
    button.addEventListener('click', function() { // Using standard function for 'this' binding
        modeButtons.forEach(btn => btn.classList.remove('selected')); // Deselect other buttons
        this.classList.add('selected'); // Select the clicked button
        currentMode = this.getAttribute('data-mode'); // Get mode from data-mode attribute
        console.log(`Mode selected: ${currentMode}`); // Log selected mode to console
    });
});


// --- Timer Functions --- (No Changes - Timer Logic Remains Same)
function startTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    timeLeft = sessionDurationSeconds;
    updateCountdownDisplay();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateCountdownDisplay();
        animateTimerIcon();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            stopSpeechRecognition();
            textDisplayArea.textContent += "\n\nSession time ended.";
            startSessionButton.classList.remove('recording');
            timerIcon.classList.remove('timer-running');
        }
    }, 1000);

    timerIcon.classList.add('timer-running');
}


function stopTimer() {
    clearInterval(timerInterval);
    timerIcon.classList.remove('timer-running');
}

function resetTimerDisplay() {
    clearInterval(timerInterval);
    timeLeft = sessionDurationSeconds;
    updateCountdownDisplay();
    timerIcon.classList.remove('timer-running');
}


function updateCountdownDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const hours = Math.floor(minutes / 60);
    const displayMinutes = minutes % 60;
    countdownDisplay.textContent = `${String(hours).padStart(1, '0')}:${String(displayMinutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}


function animateTimerIcon() {
    timerIcon.classList.toggle('timer-animate');
}



// --- Speech Recognition Setup and Control --- (No Changes - Speech Recog remains same)
function startSpeechRecognition() {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!window.SpeechRecognition) {
        alert("Speech Recognition API is not supported in your browser. Please use a modern browser like Chrome or Edge.");
        return;
    }

    recognition = new window.SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = true;

    fullTranscript = "";
    textDisplayArea.textContent = '';
    textDisplayArea.classList.remove('initial-text-placeholder');
    textDisplayArea.innerHTML = '';
    textDisplayArea.focus();

    recognition.onstart = () => {
        textDisplayArea.textContent = "Recording audio...";
        startTimer();
    };

    recognition.onspeechstart = () => {
        // No message
    };

    recognition.onspeechend = () => {
        console.log("onspeechend event fired - in continuous mode, this might be normal pause in speech.");
    };


    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error, event.message);
        textDisplayArea.textContent = `Speech recognition error: ${event.error} - ${event.message}`;
        startSessionButton.classList.remove('recording');
        endSessionButton.disabled = true;
        formatButton.disabled = true;
        stopTimer();
        resetTimerDisplay();
    };

    recognition.onresult = (event) => {
        let finalTranscriptInChunk = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            const transcriptChunk = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscriptInChunk += transcriptChunk;
            }
        }

        fullTranscript += finalTranscriptInChunk;
        textDisplayArea.textContent = fullTranscript;
    };

    recognition.start();
}


function stopSpeechRecognition() {
    if (recognition && recognition.state === 'recording') {
        recognition.stop();
        recognition.abort();
        textDisplayArea.textContent = "Stopped recording.";
        startSessionButton.classList.remove('recording');
        endSessionButton.disabled = true;
        formatButton.disabled = false;
        stopTimer();
        console.log("Speech recognition stopped and aborted.");
    } else {
        console.log("stopSpeechRecognition called but recognition not active or not recording.");
    }
}


// --- UI Event Listeners ---
startSessionButton.addEventListener('click', () => {
    if (!currentMode) {
        alert("Please select a session mode (Meeting or Lecture) first.");
        return;
    }
    startSessionButton.classList.add('recording');
    endSessionButton.disabled = false;
    formatButton.disabled = true;
    downloadButton.disabled = true;
    resetTimerDisplay();
    startSpeechRecognition();
});

endSessionButton.addEventListener('click', () => {
    stopSpeechRecognition();
    endSessionButton.disabled = true;
    startSessionButton.disabled = false;
    formatButton.disabled = false;
});


formatButton.addEventListener('click', async () => {
    if (!textDisplayArea.textContent || textDisplayArea.textContent.trim() === "" || textDisplayArea.textContent === "Error accessing microphone. Please check permissions." || textDisplayArea.textContent === "Recording audio..." || textDisplayArea.textContent === "Stopped recording.") {
        alert("No transcription available to format yet. Please record a session.");
        return;
    }
    formatButton.disabled = true;
    textDisplayArea.textContent = "Formatting notes using AI... (DeepSeek)";
    downloadButton.disabled = true;

    await formatTextWithDeepSeek(fullTranscript, currentMode); // **Correctly calling formatTextWithDeepSeek now**
});


downloadButton.addEventListener('click', async () => {
    downloadButton.disabled = true;

    const textToDownload = formattedText || fullTranscript;
    const format = downloadFormatSelect.value;

    if (!textToDownload || textToDownload.trim() === "" || textToDownload === "Error accessing microphone. Please check permissions." || textDisplayArea.textContent === "Stopped recording." || textDisplayArea.textContent === "Formatting notes using AI...") {
        alert("No content to download. Record, End Session and Format session first.");
        downloadButton.disabled = false;
        return;
    }


    if (format === 'pdf') {
        await downloadAsPDF(textToDownload);
    } else if (format === 'docx') {
        await downloadAsDOCX(textToDownload);
    } else {
        downloadButton.disabled = false;
    }
});



// --- Google Gemini API Formatting Function ---  REPLACED BY DEEPSEEK FUNCTION BELOW
// async function formatTextWithGemini(text, mode) { ... }


// --- DeepSeek AI Formatting Function --- (Replaces formatTextWithGemini - CORRECT IMPLEMENTATION)
async function formatTextWithDeepSeek(text, mode) {
    textDisplayArea.textContent = "Formatting text with AI... (DeepSeek processing)";
    const deepseek_API_KEY = "sk-0d036e30042648aea407e6bc6f6dc389"; // **Your DeepSeek API Key - IMPORTANT: Replace with your actual key if needed!**
    const deepseekApiEndpoint = 'https://api.deepseek.com/v1/chat/completions'; // DeepSeek API Endpoint


    let prompt = "";
    const currentDate = new Date().toLocaleDateString();
    let formattedOutputHeader = "";

    if (mode === 'meeting') {
        formattedOutputHeader = `MEETING MINUTES\nDate: ${currentDate}\n\n`;
        prompt = `Create structured meeting minutes from the following transcript. Include:
        - **Agenda/Topic:** Summarize the main topic of the meeting.
        - **Key Decisions & Action Items:**  Extract and list key decisions made and action items agreed upon, using bullet points.
        - **Main Discussion Points:** Summarize the key points of discussion, using bullet points.\n\nTranscript:\n${text}`;
    } else if (mode === 'lecture') {
        formattedOutputHeader = `LECTURE NOTES SUMMARY\nTopic: [Insert Lecture Topic Here - if topic identifiable from transcript, else leave as '[Insert Lecture Topic Here]']\nDate: ${currentDate}\n\n`;
        prompt = `Restructure the following lecture transcript into structured lecture notes. Include:
        - **Main Topic:** Identify and state the main topic of the lecture.
        - **Subtopics:** Break down the lecture into logical subtopics, using headings for each subtopic.
        - **Key Points under each subtopic:**  For each subtopic, list the key learning points and details in bullet points.\n\nTranscript:\n${text}`;
    }

    const deepSeekRequestOptions = { // **DEEPSEEK API REQUEST OPTIONS**
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${deepseek_API_KEY}` // **AUTH HEADER FOR DEEPSEEK**
        },
        body: JSON.stringify({
            model: "deepseek-chat", // **DEEPSEEK MODEL NAME** - Assuming "deepseek-chat" based on example.
            messages: [  // **DEEPSEEK MESSAGES FORMAT - similar to OpenAI**
                { role: "system", content: "You are a helpful assistant specialized in creating structured summaries of meetings and lectures." },
                { role: "user", content: prompt } // **USER PROMPT - with transcript**
            ]
        })
    };


    try {
        console.log("DeepSeek API Prompt being sent:", prompt); // FORMAT DEBUG LOG - Confirm Prompt being sent with text.
        const deepSeekResponse = await fetch(deepseekApiEndpoint, deepSeekRequestOptions);

        if (!deepSeekResponse.ok) {
            throw new Error(`DeepSeek API error! Status: ${deepSeekResponse.status} - Check your DeepSeek API Key and setup, and network.`);
        }
        const deepSeekResult = await deepSeekResponse.json();

        // **DEEPSEEK RESPONSE DATA EXTRACTION** - Adjust based on actual DeepSeek API response structure. Example assumes structure similar to OpenAI where text is in choices[0].message.content
        if (deepSeekResult.choices && deepSeekResult.choices.length > 0 && deepSeekResult.choices[0].message && deepSeekResult.choices[0].message.content) {
            formattedText = formattedOutputHeader + deepSeekResult.choices[0].message.content.trim(); // **Extract formatted text, trim whitespace**
            textDisplayArea.textContent = formattedText;
            downloadButton.disabled = false;
            textDisplayArea.textContent += "\n\nFormatted by DeepSeek AI.";

        } else {
            throw new Error("No formatted text received from DeepSeek API response. Unexpected API response structure."); // More specific error for response structure issues
        }


    } catch (error) {
        console.error("DeepSeek API Error:", error);
        textDisplayArea.textContent = "Formatting with DeepSeek AI failed. Raw transcription available."; // User feedback for failure
        formattedText = ""; // Fallback to raw transcript
        downloadButton.disabled = false; // Allow download of raw transcript as fallback even on format fail
    } finally {
        formatButton.disabled = false; // FORMAT button re-enabled
    }
}


// --- downloadAsPDF and downloadAsDOCX Functions --- (No changes)
async function downloadAsPDF(text) {
    textDisplayArea.textContent = "Preparing PDF for download... (CloudConvert)";
    const cloudconvert_API_KEY = "YOUR_CLOUDCONVERT_API_KEY";
    const textForDownload = formattedText || fullTranscript;


    try {

        const cloudConvertResponse = await fetch("https://api.cloudconvert.com/v2/convert", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${cloudconvert_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "tasks": {
                    "import-my-string": {
                        "operation": "import/raw",
                        "content": textForDownload,
                        "filename": "notes.txt",
                        "mime_type": "text/plain"
                    },
                    "convert-to-pdf": {
                        "operation": "convert",
                        "input": "import-my-string",
                        "output_format": "pdf",
                        "filename": "capture_notes.pdf"
                    },
                    "export-pdf": {
                        "operation": "export/url",
                        "input": "convert-to-pdf"
                    }
                }
            })
        });


        if (!cloudConvertResponse.ok) {
            throw new Error(`CloudConvert PDF API error! Status: ${cloudConvertResponse.status}`);
        }
        const cloudConvertResult = await cloudConvertResponse.json();


        const downloadUrl = cloudConvertResult.data.tasks.find(task => task.operation === 'export/url')?.result?.files[0]?.url;
        if (downloadUrl) {
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = 'capture_notes.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            textDisplayArea.textContent = "PDF download started.";
        } else {
            throw new Error("Download URL not found in CloudConvert PDF response.");
        }


    } catch (error) {
        console.error("CloudConvert PDF Error:", error);
        textDisplayArea.textContent = "Failed to create PDF. See console for details.";
    } finally {
        downloadButton.disabled = false;
    }
}


async function downloadAsDOCX(text) {
    textDisplayArea.textContent = "Preparing DOCX for download... (CloudConvert)";
    const cloudconvert_API_KEY = "YOUR_CLOUDCONVERT_API_KEY"; // **Replace with your CloudConvert API key**
    const textForDownload = formattedText || fullTranscript;


    try {

        const cloudConvertResponse = await fetch("https://api.cloudconvert.com/v2/convert", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${cloudconvert_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "tasks": {
                    "import-my-string": {
                        "operation": "import/raw",
                        "content": textForDownload,
                        "filename": "notes.txt",
                        "mime_type": "text/plain"
                    },
                    "convert-to-docx": {
                        "operation": "convert",
                        "input": "import-my-string",
                        "output_format": "docx",
                        "filename": "capture_notes.docx"
                    },
                    "export-docx": {
                        "operation": "export/url",
                        "input": "convert-to-docx"
                    }
                }
            })
        });


        if (!cloudConvertResponse.ok) {
            throw new Error(`CloudConvert DOCX API error! Status: ${cloudConvertResponse.status}`);
        }
        const cloudConvertResult = await cloudConvertResponse.json();
        const downloadUrl = cloudConvertResult.data.tasks.find(task => task.operation === 'export/url')?.result?.files[0]?.url;

        if (downloadUrl) {
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = 'capture_notes.docx';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            textDisplayArea.textContent = "DOCX download started.";
        } else {
            throw new Error("Download URL not found in CloudConvert DOCX response.");
        }


    } catch (error) {
        console.error("CloudConvert DOCX Error:", error);
        textDisplayArea.textContent = "Failed to create DOCX. See console for details.";
    } finally {
        downloadButton.disabled = false;
    }
}