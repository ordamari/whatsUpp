import { useEffect, useState } from "react";

export function useForm(initialState, cb = function () { }) {
    const [fields, setFields] = useState(initialState);

    useEffect(() => { cb(fields) }, [fields])

    return [
        fields,
        function (event) {
            if (event.img) setFields({ ...fields, data: event.img });
            else if (event.marginAll) setFields({
                ...fields,
                marginBottom: event.marginAll,
                marginTop: event.marginAll,
                marginRight: event.marginAll,
                marginLeft: event.marginAll,
            });
            else if (event.marginBT) setFields({
                ...fields,
                marginBottom: event.marginBT,
                marginTop: event.marginBT,
            });
            else if (event.marginRL) setFields({
                ...fields,
                marginRight: event.marginRL,
                marginLeft: event.marginRL,
            });
            else if (event.paddingAll) setFields({
                ...fields,
                paddingBottom: event.paddingAll,
                paddingTop: event.paddingAll,
                paddingRight: event.paddingAll,
                paddingLeft: event.paddingAll,
            });
            else if (event.paddingBT) setFields({
                ...fields,
                paddingBottom: event.paddingBT,
                paddingTop: event.paddingBT,
            });
            else if (event.paddingRL) setFields({
                ...fields,
                paddingRight: event.paddingRL,
                paddingLeft: event.paddingRL,
            });
            else if (event.pos) setFields({ ...fields, lat: event.pos.lat, lng: event.pos.lng })
            else if (event.backgroundColor) setFields({ ...fields, backgroundColor: event.backgroundColor })
            else if (event.ev) {
                setFields({
                    ...fields,
                    data: fields.data.map((line, idx) => idx === event.listIdx ? event.ev.target.value : line)
                })
            }
            else if (event.listAdd) {
                setFields({
                    ...fields,
                    data: [...fields.data, '']
                })
            }
            else if (event.deleteLine) {
                setFields({
                    ...fields,
                    data: fields.data.filter((line, idx) => idx !== event.idx)
                })
            }
            else if (event.icon || event.icon===0) {
                setFields({
                    ...fields,
                    data: event.icon
                })
            }
            else if (event.target) {

                const value = event.target.type === 'number' ? +event.target.value : event.target.value
                setFields({
                    ...fields,
                    [event.target.name]: value
                });
            }

        },

    ];
}