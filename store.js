import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const ADD_IMAGE = 'ADD_IMAGE';
const REMOVE_IMAGE = 'REMOVE_IMAGE';

// Define action types
const SET_BEDROOMS_SELECTION = 'SET_BEDROOMS_SELECTION';
const SET_BEDS_SELECTION = 'SET_BEDS_SELECTION';
const SET_BATHROOMS_SELECTION = 'SET_BATHROOMS_SELECTION';

// Define action creators
export const setBedroomsSelection = (bedrooms) => {
  return {
    type: SET_BEDROOMS_SELECTION,
    payload: bedrooms
  };
};

export const setBedsSelection = (beds) => {
  return {
    type: SET_BEDS_SELECTION,
    payload: beds
  };
};

export const setBathroomsSelection = (bathrooms) => {
  return {
    type: SET_BATHROOMS_SELECTION,
    payload: bathrooms
  };
};


const initialState = {
  pageNumber: 1,
  propertyType: '',
  propertyGuestSpace: '',
  propertyStreet: '',
  propertyCity: '',
  propertyState: '',
  propertyZipCode: '',
  propertyCountry: '',
  propertyAmenities: '',
  propertyBedroomNumber: '',
  propertyGuestNumber: '',
  propertyBathroomNumber:'',
  propertyServices: '',
  propertyImages: [], // added new field for selected image file, null
  propertyName: '',
  propertyDescription: '',
  page10Selection: '',
  propertyBookingPrice: '',
  propertyAdditionalNotes: '',
  propertySecurityDeposit: '',
  propertyHostId: "100001",
  propertyBookingConditions: '',
  propertyImage: '',
  count: 0,
  propertyBedroomNum: 0,
  propertyGuestNum: 0,
  propertyBathroomNum: 0,
  propertyHostingType: '',
  propertyCautionFee: '',
};

const formReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case 'SET_PAGE_NUMBER':
      return { ...state, pageNumber: action.payload };
    case 'SET_PROPERTY_TYPE':
      return { ...state, propertyType: action.payload };
    case 'SET_PROPERTY_GUEST_SPACE':
      return { ...state, propertyGuestSpace: action.payload };
    case 'SET_PROPERTY_HOSTING_TYPE':
      return { ...state, propertyHostingType: action.payload };
    case 'SET_PROPERTY_STREET':
      return { ...state, propertyStreet: action.payload };
    case 'SET_PROPERTY_CITY':
        return { ...state, propertyCity: action.payload };
    case 'SET_PROPERTY_STATE':
        return { ...state, propertyState: action.payload };
    case 'SET_PROPERTY_ZIPCODE':
        return { ...state, propertyZipCode: action.payload };
    case 'SET_PROPERTY_COUNTRY':
        return { ...state, propertyCountry: action.payload };
    case 'SET_PROPERTY_AMENITIES':
      return { ...state, propertyAmenities: action.payload };
    case SET_BEDROOMS_SELECTION:
      return {
        ...state,
        propertyBedroomNum: action.payload
      };
    case SET_BEDS_SELECTION:
      return {
        ...state,
        propertyGuestNum: action.payload
      };
    case SET_BATHROOMS_SELECTION:
      return {
        ...state,
        propertyBathroomNum: action.payload
      };
      
    // case 'SET_BEDROOMS_SELECTION':
    //   return { ...state, propertyBedroomNumber: action.payload };
    // case 'SET_BEDS_SELECTION':
    //   return { ...state, propertyGuestNumber: action.payload };
    // case 'SET_BATHROOMS_SELECTION':
    //   return { ...state, propertyBathroomNumber: action.payload };

    // case 'SET_PROPERTY_SERVICES':
    //   return { ...state, propertyServices: action.payload };
    // case 'SET_PROPERTY_SERVICES':
    //     if (state.propertyServices.includes(action.payload)) {
    //       // If the option is already selected, remove it
    //       return { ...state, propertyServices: state.propertyServices.filter(option => option !== action.payload) };
    //     } else {
    //       // If the option is not selected, add it
    //       return { ...state, propertyServices: [...state.propertyServices, action.payload] };
    //     }
    case 'SET_PROPERTY_SERVICES':
        if (state.propertyServices.includes(action.payload)) {
          // If the option is already selected, remove it
          return { ...state, propertyServices: state.propertyServices.filter(option => option !== action.payload) };
        } else {
          // If the option is not selected, add it
          return { ...state, propertyServices: [...state.propertyServices, action.payload] };
        }
      case 'SET_PROPERTY_IMAGE':
        return { ...state, propertyImage: action.payload };
    case 'SET_PAGE8_INPUT':
      return { ...state, propertyName: action.payload };
    case 'SET_PAGE9_INPUT':
      return { ...state, propertyDescription: action.payload };
    case 'SET_PAGE10_SELECTION':
      return { ...state, page10Selection: action.payload };
    case 'SET_PROPERTY_BOOKING_PRICE':
      return { ...state, propertyBookingPrice: action.payload };
    case 'SET_PROPERTY_CAUTION_FEE':
      return { ...state, propertyCautionFee: action.payload };
    case 'SET_PROPERTY_ADDITIONAL_NOTES':
      return { ...state, propertyAdditionalNotes: action.payload };
    // case 'ADD_PROPERTY_SERVICE':
    //   return {
    //     ...state,
    //     propertyServices: [...state.propertyServices, action.payload],
    //   };
    // case 'ADD_PROPERTY_SERVICE':
    //   return { ...state, propertyServices: action.payload };
      
    // case 'REMOVE_PROPERTY_SERVICE':
    //   return {
    //     ...state,
    //     propertyServices: state.propertyServices.filter((option) => option !== action.payload),
    //   };
    case 'SET_PROPERTY_SECURITY_DEPOSIT':
      return { ...state, propertySecurityDeposit: action.payload };
    case 'SET_PROPERTY_BOOKING_CONDITIONS':
      return { ...state, propertyBookingConditions: action.payload };
    case ADD_IMAGE:
      return { ...state, propertyImages: [...state.propertyImages, ...action.payload] };
    case REMOVE_IMAGE:
      return { ...state, propertyImages: action.payload };
      // return {
      //     ...state,
      //     propertyImages: newImages,
      //   };
    // case SET_COUNT:
    //   return { ...state, count: action.payload };
    default:
      return state;
  }
};

const store = createStore(formReducer, applyMiddleware(thunk));

export default store;
export { ADD_IMAGE, REMOVE_IMAGE };