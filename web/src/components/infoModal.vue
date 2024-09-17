<template>
    <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-colorBackground rounded-lg p-6 shadow-lg relative w-96">
        <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
            X
        </button>
        <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
    props: {
        isVisible: {
        type: Boolean,
        default: false
        }
    },
    methods: {
        closeModal() {
        this.$emit('close');
        }
    }
    }
</script>