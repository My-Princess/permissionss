import { resolve } from "path"

const state = {
    visitedViews: [],
    cachedViews: []
  }
  const mutations = {
    ADD_VISITED_VIEW: (state, view) => {
        if(state.visitedViews.some(v => v.path === view.path )) return
        state.visitedViews.push(
            Object.assign({},view,{
                title:view.meta.title || 'no-name'
            })
        )
    },
    DEL_VISITED_VIEW:(state,view)=>{
        // for(const [i,v] of state.visitedViews)
    }
  }
  const actions = {
    addVisitedView({ commit }, view) {
        commit('ADD_VISITED_VIEW', view)
    },
    delView({dispatch,state},view){
        return new Promise(resolve=>{
            dispatch('delVisitedView',view)
        })

    },
    delVisitedView({commit,state},view){
        return new Promise(resolve=>{
            commit('DEL_VISITED_VIEW',view)
        })
    }
  }

  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  