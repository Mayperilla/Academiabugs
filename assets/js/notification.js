async function showNotification() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
        console.log('Permiso concedido');
    }
}

async function showNotification() {
    const permission = await Notification.requestPermission();
    // Verifica si el permiso fue concedido
    if (permission === 'granted') {
        new Notification("Tu pedido está por llegar!", {
            body: "Gracias por tu compra. Tu pedido llegará pronto.",
            icon: "/assets/img/favicon.png"
            //...
        });
    }
}