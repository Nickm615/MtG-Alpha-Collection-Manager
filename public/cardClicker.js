const cardClickHandler = async (event) =>{
    event.preventDefault();

    const id = (event.target.id)
    const url = (event.target.dataset.img)
    console.log(id, url)

            await fetch('/card-list', {
                method: 'POST',
                body: JSON.stringify({id, url}),
                headers: { 'Content-Type': 'application/json' },
    
        });

    }



document
    .querySelector('#card-field')
    .addEventListener('click', cardClickHandler)
