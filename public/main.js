const deleteText = document.querySelectorAll('.del')

Array.from(deleteText).forEach((element) => {
    element.addEventListener('click', deleteTask)
})

async function deleteTask() {
    const tName = this.parentNode.childNodes[1].innerText
    const tDesc = this.parentNode.childNodes[3].innerText
    try {
        const response = await fetch('deleteTask', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'taskNameS': tName,
                'taskDescriptionS': tDesc
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()

    } catch (err) {
        console.log(err)
    }

}


const completed = document.querySelectorAll('.complete')

Array.from(completed).forEach((element) => {
    element.addEventListener('click', comp)
})

async function comp() {
    const tName = this.parentNode.childNodes[1].innerText
    const tDesc = this.parentNode.childNodes[3].innerText
    const tCompleted = true
    try {
        const response = await fetch('comp', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'taskNameS': tName,
                'taskDescriptionS': tDesc,
                'completedS': tCompleted
            })
        })
        const data = await response.json()

        location.reload()
    } catch (err) {
        console.log(err)
    }
}