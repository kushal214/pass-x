function maskPassword(pass) {
    return '*'.repeat(pass.length);
}

function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
            document.getElementById("alert").style.display = "inline";
            setTimeout(() => {
                document.getElementById("alert").style.display = "none";
            }, 2000);
        },
        () => {
            alert("Clipboard copying failed");
        }
    );
}

const deletePassword = (website) => {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data) || [];
    let arrUpdated = arr.filter((e) => e.website !== website);
    localStorage.setItem("passwords", JSON.stringify(arrUpdated));
    alert(`Successfully deleted ${website}'s password`);
    showPasswords();
};

const showPasswords = () => {
    let tb = document.querySelector("table");
    let data = localStorage.getItem("passwords");

    if (!data) {
        tb.innerHTML = `<tr>
            <th>Website</th>
            <th>Username</th>
            <th>Password</th>
            <th>Delete</th>
        </tr>
        <tr>
            <td colspan="4" style="text-align:center; padding: 10px; font-style: italic; color: gray;">
                No saved data yet
            </td>
        </tr>`;
        return;
    }

    let arr = JSON.parse(data);

    
    arr = arr.filter(entry =>
        entry &&
        entry.website && entry.website.trim() !== "" &&
        entry.username && entry.password
    );

    if (arr.length === 0) {
        tb.innerHTML = `<tr>
            <th>Website</th>
            <th>Username</th>
            <th>Password</th>
            <th>Delete</th>
        </tr>
        <tr>
            <td colspan="4" style="text-align:center; padding: 10px; font-style: italic; color: gray;">
                No saved data yet
            </td>
        </tr>`;
        return;
    }

    let str = `<tr>
        <th>Website</th>
        <th>Username</th>
        <th>Password</th>
        <th>Delete</th>
    </tr>`;

    arr.forEach(element => {
        str += `<tr>
            <td>${element.website} <i class="fa-solid fa-copy" onclick="copyText('${element.website}')" style="cursor:pointer; margin-left:8px;"></i></td>
            <td>${element.username} <i class="fa-solid fa-copy" onclick="copyText('${element.username}')" style="cursor:pointer; margin-left:8px;"></i></td>
            <td>${maskPassword(element.password)} <i class="fa-solid fa-copy" onclick="copyText('${element.password}')" style="cursor:pointer; margin-left:8px;"></i></td>
            <td><button class="btnsm" onclick="deletePassword('${element.website}')"><i class="fa-solid fa-trash"></i></button></td>
        </tr>`;
    });

    tb.innerHTML = str;

    website.value = "";
    username.value = "";
    password.value = "";
};

console.log("Working");
showPasswords();

document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault();

    let websiteVal = website.value.trim();
    let usernameVal = username.value.trim();
    let passwordVal = password.value.trim();

    if (!websiteVal || !usernameVal || !passwordVal) {
        alert("Please fill all fields!");
        return;
    }

    let passwords = localStorage.getItem("passwords");
    let json = passwords ? JSON.parse(passwords) : [];

    json.push({
        website: websiteVal,
        username: usernameVal,
        password: passwordVal
    });

    alert("Password Saved");
    localStorage.setItem("passwords", JSON.stringify(json));
    showPasswords();
});
