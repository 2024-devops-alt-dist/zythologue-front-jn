import React, { useState } from 'react';

interface CarouselProps {
    items: any[]; // Data for the carousel (beers or breweries)
    renderItem: (item: any) => React.ReactNode; // Render logic for each item
    style?: React.CSSProperties; // Custom styles for the container
    visibleItems?: number; // Number of items visible at a time
}

const CustomCarousel: React.FC<CarouselProps> = ({ items, renderItem, style, visibleItems = 3 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? items.length - visibleItems : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === items.length - visibleItems ? 0 : prevIndex + 1
        );
    };

    // Slice the items to display only the visible ones
    const visibleSlice = items.slice(
        currentIndex,
        currentIndex + visibleItems
    );

    // Handle wrapping if the currentIndex + visibleItems exceeds the array length
    const itemsToRender =
        visibleSlice.length < visibleItems
            ? [...visibleSlice, ...items.slice(0, visibleItems - visibleSlice.length)]
            : visibleSlice;

    return (
        <div style={{ ...defaultStyle.container, ...style }}>
            <button onClick={handlePrev} style={defaultStyle.navButton}>
                &#8592;
            </button>
            <div style={defaultStyle.carousel}>
                {itemsToRender.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            ...defaultStyle.item,
                            width: `${100 / visibleItems}%`, // Divide space equally
                        }}
                    >
                        {renderItem(item)}
                    </div>
                ))}
            </div>
            <button onClick={handleNext} style={defaultStyle.navButton}>
                &#8594;
            </button>
        </div>
    );
};
const defaultStyle : { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '40px',
        overflow: 'hidden',
        position: 'relative',
        width: '110%',
        // maxWidth: '1000px',
        // margin: '0 auto',
    },
    carousel: {
        display: 'flex',
        overflow: 'hidden',
        flex: 1,
    },
    item: {
        flexShrink: 0,
        // padding: '10px',
        textAlign: 'center',
        // border: '1px solid #ddd',
        // borderRadius: '8px',
        background: '#fff',
        margin: '0 5px',
    },
    navButton: {
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        fontSize: '18px',
        fontWeight: 'bold',
    },
};

export default CustomCarousel;
