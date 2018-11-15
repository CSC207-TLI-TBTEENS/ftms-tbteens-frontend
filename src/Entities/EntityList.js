import React, {Component} from 'react';
import EntityItem from './EntityItem';

class EntityList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const entities = this.props.entities.map(entity => (
            <EntityItem
                key={entity.id}
                {...entity}
            />
        ));
        
        let [id1, id2, id3] = [this.props.ids[0], this.props.ids[1], this.props.ids[2]]

        return (
            <table className="table">
                <thead>
                    <tr className="table-head">
                        <th scope="col">{id1}</th>
                        <th scope="col">{id2}</th>
                        <th scope="col">{id3}</th>
                    </tr>
                </thead>
                <tbody>
                {entities}
                </tbody>
            </table>
        )
    }
}

export default EntityList;