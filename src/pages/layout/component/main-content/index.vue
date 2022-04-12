<template>
    <div class="main-container">
        <TopAside/>
        <TagsView />
        <Content/>
    </div>
</template>

<script>
import TopAside from './top-aside'
import TagsView from '../TagsView/index'
import Content from './content'

export default {
    data() {
        return {}
    },
    computed: {
    },
    components: {
        TopAside,
        TagsView,
        Content
    }
}

</script>
