const btnLogin = document.getElementById("log")
const btnSave = document.getElementById("save")
const btnSend = document.getElementById("send")
const socket = io();

btnLogin.onclick = e => {
    e.preventDefault()

    const username = document.getElementById('username').value
    localStorage.setItem('user', username)

    socket.emit('chat-in', {username})
}

btnSave.onclick = e => {
    e.preventDefault()

    const name = document.getElementById('name').value
    const category = document.getElementById('category').value
    const price = document.getElementById('price').value
    const img = document.getElementById('img').value

    socket.emit('add', {name, category, price, img, username})
}

btnSend.onclick = e => {
    e.preventDefault()
    const username = localStorage.getItem('user')
    const msg = document.getElementById('msg').value
    socket.emit('chat-in', {msg, username})
}

socket.on('show', products => {
    console.log(products)

    fetch('/products')
    .then(r => r.text())
    .then(html => {
        const div = document.getElementById('products')
        div.innerHTML = html
    })
    .catch( e => console.log(e))
});

socket.on('chat-out', () => {
    fetch('/messages')
    .then(r => r.text())
    .then(html => {
        const div = document.getElementById("chat")
        div.innerHTML = html
    })
    .catch( e => console.log(e))
});
