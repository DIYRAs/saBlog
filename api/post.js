export default async function handler(req, res) {
    const response = await fetch('https://sriyx.wuaze.com/saBlog/control.php', {
        method: req.method,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    res.status(200).json(data);
}