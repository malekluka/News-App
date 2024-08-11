async function getSportsNews(){
    const url = "https://newsapi.org/v2/top-headlines?country=eg&category=sports&apiKey=5d17ccbd21134fd4a192f0d6b9701bef"
    const response = await fetch(url)
    const body = await response.json()
    return(body.articles)
}
async function displaySportsNews(){
    const sportsnews = await getSportsNews();
    const row = document.querySelector('.row')
    for (let newvalue of sportsnews){
        const div = document.createElement("div")
        const defaultImg = "DefaultNews.png"
        div.className = "col-lg-4 col-md-6 col-sm-12 my-3"
        div.innerHTML =  `
        <div class="card h-100" style="width: 18rem;">
            <img class="card-img-top" src="${newvalue.urlToImage ? newvalue.urlToImage:defaultImg}" alt="Card image cap">
            <div class="card-body d-flex flex-column ">
                <h5 class="card-title">${newvalue.title}</h5>
                <hr>
                <div class = "alert alert-info m-2">
                Created by ${newvalue.author} <br>
                At ${newvalue.publishedAt}
                </div>
                 <div class="d-flex justify-content-center mt-auto">
                    <a href="${newvalue.url}" target="_blank" class="btn btn-dark mx-1">Go to Source</a>
                    <a href="" target="_blank" onclick="showDetails({
                            title: '${newvalue.title}',
                            urlToImage: '${newvalue.urlToImage ? newvalue.urlToImage : "DefaultNews.png"}',
                            author: '${newvalue.author || 'Unknown'}',
                            publishedAt: '${newvalue.publishedAt}',
                            description: '${newvalue.description || 'No description available'}',
                            content: '${newvalue.content || 'No content available'}',
                            url: '${newvalue.url}'
                        }); return false;" class="btn btn-secondary mx-1">Details</a>
                </div>
            </div>
        </div>
        `
        row.appendChild(div)
    }
}
function showDetails(newValue) {
    
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">      
             <title>News Details</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                }
                img {
                    max-width: 100%;
                    height: auto;
                }
                .news-details {
                    max-width: 800px;
                    margin: auto;
                }
            </style>
        </head>
        <body>
            <div class="news-details">
                <h1 class="bg-dark text-light py-3 text-center">${newValue.title}</h1>
                <img src="${newValue.urlToImage ? newValue.urlToImage:"DefaultNews.png"}" alt="News Image">
                <p><strong>Author:</strong> ${newValue.author}</p>
                <p><strong>Published At:</strong> ${newValue.publishedAt}</p>
                <p><strong>Description:</strong> ${newValue.description}</p>
                <p><strong>Content:</strong> ${newValue.content}</p>
                <p><a href="${newValue.url}" target="_blank" class="btn btn-dark mx-1">Go to Source</a></p>
            </div>
        </body>
        </html>
    `;

    // Create a Blob from the HTML content
    const blob = new Blob([htmlContent], { type: 'text/html' });
    
    // Create a URL for the Blob and open it in a new tab
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
}

(function() {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init({
      publicKey: "3LkkT06RbKTFh9lJT",
    });
})();
function sendEmail() {
    const templateParams = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    emailjs.send('service_v7imnxf', 'template_k52yh76', templateParams)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            alert('Email sent successfully!');
        }, (error) => {
            console.log('FAILED...', error);
            alert('Failed to send email. Please try again.');
        });
}
document.addEventListener('DOMContentLoaded', displaySportsNews)
