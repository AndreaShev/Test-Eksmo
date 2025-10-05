document.addEventListener('DOMContentLoaded', function() {
    const shuffleBtn = document.getElementById('shuffleBtn');
    
    // Initialize read more functionality
    initReadMore();
    
    // Shuffle button event listener
    shuffleBtn.addEventListener('click', shuffleBooks);
    
    function shuffleBooks() {
        // Get all book cards
        const allBookCards = Array.from(document.querySelectorAll('.book-card'));
        
        // Group books by their sort attribute
        const booksBySort = {};
        
        allBookCards.forEach(book => {
            const sortValue = book.getAttribute('data-sort');
            if (!booksBySort[sortValue]) {
                booksBySort[sortValue] = [];
            }
            booksBySort[sortValue].push(book);
        });
        
        // Shuffle each group
        for (const sortGroup in booksBySort) {
            booksBySort[sortGroup] = shuffleArray(booksBySort[sortGroup]);
        }
        
        // Sort groups by sort value and flatten
        const sortedGroups = Object.keys(booksBySort)
            .sort()
            .map(sortValue => booksBySort[sortValue]);
        
        const shuffledBooks = sortedGroups.flat();
        
        // Remove all book cards from DOM
        allBookCards.forEach(book => book.remove());
        
        // Reinsert books in new order with proper layout
        reorganizeBookLayout(shuffledBooks);
        
        // Reinitialize read more functionality for new layout
        initReadMore();
    }
    
    function shuffleArray(array) {
        // Fisher-Yates shuffle algorithm :cite[8]
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
    
    function reorganizeBookLayout(books) {
        const firstRow = document.querySelector('.first-row');
        const leftHalf = firstRow.querySelector('.left-half');
        const rightHalf = firstRow.querySelector('.right-half');
        const standardGrid = document.querySelector('.standard-grid');
        
        // Clear existing content
        leftHalf.innerHTML = '';
        rightHalf.innerHTML = '';
        standardGrid.innerHTML = '';
        
        // Assign first book to left half (big card)
        if (books.length > 0) {
            const firstBook = books[0];
            firstBook.className = 'book-card big-card';
            leftHalf.appendChild(firstBook);
        }
        
        // Assign next three books to right half (small cards)
        for (let i = 1; i <= 3 && i < books.length; i++) {
            const book = books[i];
            book.className = 'book-card small-card';
            rightHalf.appendChild(book);
        }
        
        // Assign remaining books to standard grid
        for (let i = 4; i < books.length; i++) {
            const book = books[i];
            book.className = 'book-card standard-card';
            standardGrid.appendChild(book);
        }
    }
    
    function initReadMore() {
        const descriptions = document.querySelectorAll('.description');
        
        descriptions.forEach(description => {
            const textElement = description.querySelector('.description-text');
            const button = description.querySelector('.read-more');
            
            // Check if text is truncated on mobile
            const checkTruncation = () => {
                if (window.innerWidth <= 768) {
                    if (textElement.scrollHeight > textElement.clientHeight) {
                        description.classList.add('truncated');
                        button.style.display = 'block';
                    } else {
                        description.classList.remove('truncated');
                        button.style.display = 'none';
                    }
                } else {
                    description.classList.remove('truncated', 'expanded');
                    button.style.display = 'none';
                }
            };
            
            // Initial check
            checkTruncation();
            
            // Toggle expanded state
            button.addEventListener('click', function() {
                if (description.classList.contains('expanded')) {
                    description.classList.remove('expanded');
                    description.classList.add('truncated');
                    button.textContent = 'Читать полностью';
                } else {
                    description.classList.remove('truncated');
                    description.classList.add('expanded');
                    button.textContent = 'Свернуть';
                }
            });
            
            // Check on window resize
            window.addEventListener('resize', checkTruncation);
        });
    }
    
    // Load more button functionality (placeholder)
    const loadMoreBtn = document.querySelector('.load-more');
    loadMoreBtn.addEventListener('click', function() {
        alert('Функция "Смотреть еще" будет реализована при необходимости');
    });
});