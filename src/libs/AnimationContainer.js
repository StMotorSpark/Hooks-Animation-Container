import React from 'react';

const useState = React.useState;
const useEffect = React.useEffect;
const useRef = React.useRef;

function useAnimationState(children) {
    const [animatedItems, setItems] = useState(null);
    const itemRef = useRef(animatedItems)
    const setAnimatedItems = (newState) => {
        itemRef.current = newState;
        return setItems(newState);
    }
    const priorItem = useRef();

    function animationEnd() {
        // update the animatedItems to remove the first item
        setAnimatedItems(itemRef.current.slice(1));
    }

    useEffect(() => {
        var key = `${children.key}_animated`;

        if (animatedItems == null) {
            // initial render of the component does not need a transition animation
            setAnimatedItems([<div key={key}>{children}</div>]);
            priorItem.current = children;
        } else {
            // on updates to the children, updated the animated chilren array to contain the new element
            // the first element in the array should be wrapped with the slide out animation
            var priorItemKey = `${priorItem.current.key}_animated`;
            setAnimatedItems([<div key={priorItemKey.current} className={"slideOut"} onAnimationEnd={animationEnd}>{priorItem.current}</div>].concat([<div key={key} className={"fadeIn"}>{children}</div>]));
        }
    }, [children])

    return animatedItems;
}

function AnimationComponent(props) {
    var animatedItems = useAnimationState(props.children);

    return <div className={"animatedContainer"}>
        {animatedItems}
    </div>
}

export default AnimationComponent;