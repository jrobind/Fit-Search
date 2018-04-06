import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';

const Map = () => <div></div>;

class MapContainer extends Component {
    constructor(props) {
        super(props);
        
        this.setupMapMarker = this.setupMapMarker.bind(this);
    }
    
    setupMapMarker({ map, maps}) {
        const { radius, base } = this.props;
        
        const marker = new maps.Marker( {
            position: this.props.coordinates,
            map: map
        });
        
        marker.Circle = new maps.Circle({
            center: marker.getPosition(),
            strokeWeight: 0.3,
            fillColor: '#FF0000',
            fillOpacity: 0.15,
            map: map, 
            radius: radius * 1609.344
        });
    }
    
    render() {
        return (
            <div className="map-container">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyDDDI1kAqzyvj4haRm4i4Tl25n33fU82k8' }}
                    center={this.props.coordinates}
                    zoom={10}
                    onGoogleApiLoaded={this.setupMapMarker}
                    yesIWantToUseGoogleMapApiInternals={true}
                >
                    <Map/>
                </GoogleMapReact>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { base, radius } = state.selectedTrainer.profile;
    
    return {
        base,
        radius
    }
};

export default connect(mapStateToProps)(MapContainer);