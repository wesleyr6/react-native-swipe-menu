# Sidebar menu with swipe using PanResponder and Animated
Testing how to build a sidebar menu with Swipe using PanResponder and Animated

## Check it out
[https://exp.host/@wesleyamaro/test-menu-animation](https://exp.host/@wesleyamaro/test-menu-animation)

## Installing
`npm install` 

## Running
`npm start`  
`npm run android` 
`npm run ios` 

## Usage
```javascript
const App = () => {
    // <Sidebar />: Component
    // <Menu />: Your component do render into <Sidebar />. It can receive 2 props
    // <Content />: Your component do render the content. It can receive 2 props

    return (
        <View>
            <StatusBar bg={'#313131'} />
            
            <Sidebar menu={<Menu />}>
                <Content />
            </Sidebar>
        </View>
    );
}
```

## Components and Props
| component | props | type | description |
| ---- | ---- | ----| ---- |
| Sidebar | menu | React.Component | Menu component |
|  |  |  |  |
| Content | sidebarIsOpened | boolean | Sidebar status |
| Content | openSidebar | function | Event handler to open sidebar |
|  |  |  |  |
| Menu | sidebarIsOpened | boolean | Sidebar status |
| Menu | closeSidebar | function | Event handler to close sidebar |