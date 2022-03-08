export const initialState = {
    authStatus: 'welcome', // welcome, auth, visiting, onboarding, loggedIn
    authStatusChecked: false, // welcome, auth, visiting, onboarding, loggedIn
    city: '',
    productLists: {
        dailyDiscovery: [],
        searchResults: [],
        merchant: [],
        favourites: [],
        hotItems: [],
        cartItems: []
    },
    error: '',
    search: {
        text: ''
    },
    filters: {
        sizes: [],
        buckets: [],
        shops: [],
        gender: []
    },
    filtersV2: [],
    user: {
        id: null,
        name: '',
        email: '',
        birthdate: 1988,
        gender: 'female',
        image: '',
        notifications: {
            enablePushNotifications: true,
            sendWeeklyFlyers: true,
            personalizeSearchResults: true,
            completedOnboard: false
        },
        location: {
            lat: 49.8,
            lng: -119.6,
            address: '',
            city: ''
        },
        favourite: {
            styles: [],
            brands: [],
            venders: [],
            products: []
        },
        size: {
            top: [],
            shoes: [],
            bottom: []
        },
        buckets: [],
        role: 'shopper'
    },
    ui: {
        listStyle: 'grid'
    },
    isLoading: false
};
