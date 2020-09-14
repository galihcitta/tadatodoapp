export const state = () => ({
    list: []
})

export const mutations = {
    add(state, text){
        state.list.push({
            text,
            done: false,
            created: new Date()
        })
    },
    remove(state, todo){
        state.list.splice(state.list.indexOf(todo), 1)
    },
    update(state, todo){
        todo.done = !todo.done
    }
}       