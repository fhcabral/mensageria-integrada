<template>
    <div class="loading-overlay">
        <div class="loading-container">
            <div class="spinner"></div>
            <div class="loading-text">
                Carregando, aguarde...
            </div>
        </div>
    </div>
</template>

<style scoped>
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(26, 26, 26); /* Fundo escuro com transparência */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999; /* Garante que fique por cima de outros elementos */
    backdrop-filter: blur(5px); /* Efeito de desfoque adicional */
}

.loading-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.loading-text {
    font-size: 1.2rem;
    color: #ffffff;
    animation: pulse 1.5s ease-in-out infinite;
    font-family: Arial, sans-serif;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #333333;
    border-top: 4px solid #00ff88;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    box-shadow: 0 0 15px rgba(0, 255, 136, 0.3);
}

@keyframes pulse {
    0% {
        opacity: 0.5;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0.5;
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>