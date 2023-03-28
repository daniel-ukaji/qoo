import { createStore } from 'redux';



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
  propertyImages: '', // added new field for selected image file, null
  propertyName: '',
  propertyDescription: '',
  page10Selection: '',
  propertyBookingPrice: '',
  propertyAdditionalNotes: '',
  propertySecurityDeposit: '',
  propertyHostId: "100001",
  propertyBookingConditions: '',
};

const formReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case 'SET_PAGE_NUMBER':
      return { ...state, pageNumber: action.payload };
    case 'SET_PROPERTY_TYPE':
      return { ...state, propertyType: action.payload };
    case 'SET_PROPERTY_GUEST_SPACE':
      return { ...state, propertyGuestSpace: action.payload };
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
    case 'SET_BEDROOMS_SELECTION':
      return { ...state, propertyBedroomNumber: action.payload };
    case 'SET_BEDS_SELECTION':
      return { ...state, propertyGuestNumber: action.payload };
    case 'SET_BATHROOMS_SELECTION':
      return { ...state, propertyBathroomNumber: action.payload };
    case 'SET_PROPERTY_SERVICES':
      return { ...state, propertyServices: action.payload };
    case 'SET_PROPERTY_IMAGES':
      return { ...state, propertyImages: action.payload };
    case 'SET_PAGE8_INPUT':
      return { ...state, propertyName: action.payload };
    case 'SET_PAGE9_INPUT':
      return { ...state, propertyDescription: action.payload };
    case 'SET_PAGE10_SELECTION':
      return { ...state, page10Selection: action.payload };
    case 'SET_PROPERTY_BOOKING_PRICE':
      return { ...state, propertyBookingPrice: action.payload };
    case 'SET_PROPERTY_ADDITIONAL_NOTES':
      return { ...state, propertyAdditionalNotes: action.payload };
    case 'SET_PROPERTY_SECURITY_DEPOSIT':
      return { ...state, propertySecurityDeposit: action.payload };
    case 'SET_PROPERTY_BOOKING_CONDITIONS':
      return { ...state, propertyBookingConditions: action.payload };
    // case 'ADD_PROPERTY_IMAGE':
    //   return { ...state, propertyImages: [...state.propertyImages, action.payload] }; // add new image to array
    // case 'REMOVE_PROPERTY_IMAGE':
    //   return { ...state, propertyImages: state.propertyImages.filter(image => image !== action.payload) }; // remove image from array
    default:
      return state;
  }
};

const store = createStore(formReducer);

export default store;
