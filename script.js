// Initialize the sentiment chart
function initSentimentChart() {
    const ctx = document.getElementById('sentimentChart');
    if (ctx) {
        new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                datasets: [{
                    label: 'Market Sentiment',
                    data: [65, 59, 80, 81, 56],
                    borderColor: '#2563eb',
                    tension: 0.4,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                }
            }
        });
    }
}

// Initialize portfolio sentiment chart
function initPortfolioSentimentChart() {
    const ctx = document.getElementById('portfolioSentimentChart');
    if (ctx) {
        new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                datasets: [{
                    label: 'Portfolio Sentiment',
                    data: [70, 65, 85, 82, 78],
                    borderColor: '#10b981',
                    tension: 0.4,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                }
            }
        });
    }
}

// Initialize trending stock charts
function initTrendingCharts() {
    const chartConfigs = [
        { id: 'trendingChart1', data: generateChartData(10, true) },
        { id: 'trendingChart2', data: generateChartData(8, true) },
        { id: 'trendingChart3', data: generateChartData(12, true) },
        { id: 'adaniChart', data: generateChartData(15, true) },
        { id: 'zomatoChart', data: generateChartData(9, true) }
    ];

    chartConfigs.forEach(config => {
        const ctx = document.getElementById(config.id)?.getContext('2d');
        if (ctx) {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: Array.from({length: config.data.length}, (_, i) => i + 1),
                    datasets: [{
                        data: config.data,
                        borderColor: '#22c55e',
                        borderWidth: 2,
                        tension: 0.4,
                        pointRadius: 0,
                        fill: true,
                        backgroundColor: 'rgba(34, 197, 94, 0.1)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            display: false
                        },
                        y: {
                            display: false
                        }
                    }
                }
            });
        }
    });
}

// Initialize wishlist charts
function initWishlistCharts() {
    const chartIds = ['chart1', 'chart2', 'chart3'];
    chartIds.forEach(id => {
        const ctx = document.getElementById(id)?.getContext('2d');
        if (ctx) {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: Array.from({length: 20}, (_, i) => i + 1),
                    datasets: [{
                        data: generateChartData(20),
                        borderColor: '#2563eb',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true,
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        pointRadius: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            display: false
                        },
                        y: {
                            display: false
                        }
                    }
                }
            });
        }
    });
}

// Add navigation active state
function updateActiveNav() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize portfolio value with animation
function animatePortfolioValue() {
    const valueElement = document.querySelector('.portfolio-stats .value');
    if (valueElement) {
        const targetValue = 4293837; // Updated to match new total
        let currentValue = 0;
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = targetValue / steps;
        const stepDuration = duration / steps;

        const interval = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(interval);
            }
            valueElement.textContent = `₹${Math.round(currentValue).toLocaleString('en-IN')}`;
        }, stepDuration);
    }
}

// Handle filter buttons
function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

// Initialize all features when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initSentimentChart();
    initPortfolioSentimentChart();
    initTrendingCharts();
    initWishlistCharts();
    updateActiveNav();
    animatePortfolioValue();
    initFilterButtons();
});

// Helper function to generate random chart data
function generateChartData(points, trending = false) {
    const data = [];
    let value = 100;
    
    for (let i = 0; i < points; i++) {
        if (trending) {
            value += Math.random() * 10 - 3; // Bias towards upward trend
        } else {
            value += Math.random() * 10 - 5;
        }
        data.push(Math.max(0, value));
    }
    
    return data;
} 