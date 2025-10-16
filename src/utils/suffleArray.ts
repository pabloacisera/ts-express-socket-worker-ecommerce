export function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        
        // Usar aserción de tipo
        [shuffled[i], shuffled[j]] = [shuffled[j] as T, shuffled[i] as T];
    }
    
    return shuffled;
}