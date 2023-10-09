import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import useEmblaCarousel from "embla-carousel-react";

import useAppStore from "../../stores/useAppStore";
import fetchWithAxios from "../../utils/fetchWithAxios";
import { IAPIResponse, ILocation } from "../../utils/interfaces";

import { BiCopy, BiBookmark, BiSolidBookmark } from "react-icons/bi";
import { RxDotFilled } from "react-icons/rx";
import OllieAvatar from "./OllieAvatar";
import ChatBubble from "./ChatBubble";
import InteractiveMap from "./InteractiveMap";
import LocationInfoPanel from "./LocationInfoPanel";

interface Props {
    apiResponse: IAPIResponse
}

const ApiResponse: React.FC<Props> = ({ apiResponse }) => {
    const user = useAppStore((state) => state.user);

    const [focusedLocation, setFocusedLocation] = useState(apiResponse.locations[0] ?? null);
    const [locationToSave, setLocationToSave] = useState<null | ILocation>(null);

    useEffect(() => {
        setFocusedLocation(apiResponse.locations[0] ?? null);
    }, [apiResponse]);

    const copyText = useAppStore((state) => state.copyText);

    // Gain access to the embla carousel api
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

    const [currentSlideIndex, setCurrentSlideIndex] = useState(emblaApi?.selectedScrollSnap() ?? 0);

    // Whenever a new slide is in view, update the currentSlideIndex
    emblaApi?.on("select", () => setCurrentSlideIndex(emblaApi?.selectedScrollSnap()));

    const { mutate: saveLocation, isLoading: isSaveLoading } = useMutation(async (location: ILocation) => {
        await fetchWithAxios(`${import.meta.env.VITE_API_URL}/savedlocations`, 'POST', { name: location.name, userId: user?.id });

        return location
    }, {
        onMutate: (location) => setLocationToSave(location),
        onSuccess: (location) => {
            apiResponse.locations.map((elm) => elm == location ? elm.isSaved = true : '')
        },
        onSettled: () => setLocationToSave(null)
    });

    const { mutate: deleteSavedLocation, isLoading: isDeleteLoading } = useMutation(async (location: ILocation) => {
        await fetchWithAxios(`${import.meta.env.VITE_API_URL}/savedlocations`, 'DELETE', null, { name: 'savedLocations', content: location.name });

        return location;
    }, {
        onMutate: (location) => setLocationToSave(location),
        onSuccess: (deletedLocation) => {
            apiResponse.locations.map((location) => location.name === deletedLocation.name ? location.isSaved = false : location)
        }
    })

    return (
        <div>
            <div className="xl:flex gap-4 items-center w-full">
                <div className="self-start">
                    <OllieAvatar />
                </div>

                <div className="w-full h-full">
                    <ChatBubble isResponse={true}>
                        <p className="mb-2">I've found {apiResponse.locations.length} location{apiResponse.locations.length >= 2 || apiResponse.locations.length === 0 ? "s" : ""} for you</p>
                    </ChatBubble>


                    <div className="max-w-[29rem] h-48 p-3 bg-white rounded-xl">
                        <InteractiveMap locations={apiResponse.locations} />
                    </div>

                    <div className="hidden xl:flex flex-row-reverse">
                        {focusedLocation && (
                            <div className="flex w-full h-full bg-[#F8F5F5] rounded-xl">
                                <div className="w-2 bg-primary rounded-l-lg" >
                                </div>

                                <div className="w-full h-full p-3 object-container">
                                    <LocationInfoPanel location={focusedLocation} />
                                </div>
                            </div>
                        )}

                        <div>
                            {apiResponse.locations.map((location, index) => {
                                return (
                                    <div key={`API Response: ${index}`} onClick={() => setFocusedLocation(location)} className="cursor-pointer">
                                        <ChatBubble isResponse={true} isFocused={location === focusedLocation}>
                                            <div className="flex justify-between items-center p-1 sm:w-[27rem]">
                                                <div className="flex items-center gap-6 w-full">
                                                    {/* Render the letters of the alphabet starting with 'A' */}
                                                    <p className="text-3xl text-primary">{String.fromCharCode(65 + index)}</p>

                                                    <div className="w-full">
                                                        <p className="font-semibold">{location.name}</p>

                                                        <div className="flex gap-2 my-3">
                                                            <a href={location.website} target="_blank" className="btn btn-xs border-none bg-gray-200 text-black hover:bg-gray-300">Website</a>
                                                            <a href={location.addressLink} target="_blank" className="btn btn-xs border-none bg-gray-200 text-black hover:bg-gray-300">Directions</a>
                                                        </div>

                                                        <p className="text-sm">{location.address}</p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-6">
                                                    {user && (
                                                        <button className={`btn btn-square btn-xs bg-inherit border-none ml-4 hover:bg-gray-200`}>
                                                            {location.isSaved ? (
                                                                isDeleteLoading && locationToSave === location ? (
                                                                    <span className="loading loading-spinner loading-sm"></span>
                                                                ) : (
                                                                    <BiSolidBookmark onClick={() => deleteSavedLocation(location)} className="text-xl text-black" />
                                                                )
                                                            ) : (
                                                                isSaveLoading && locationToSave === location ? (
                                                                    <span className="loading loading-spinner loading-sm"></span>
                                                                ) : (
                                                                    <BiBookmark onClick={() => saveLocation(location)} className="text-xl text-black" />
                                                                )
                                                            )}
                                                        </button>
                                                    )}


                                                    <button className={`btn btn-square btn-xs bg-inherit border-none ml-4 hover:bg-gray-200`} onClick={() => copyText(location.address)}>
                                                        <BiCopy className="text-xl text-black" />
                                                    </button>
                                                </div>
                                            </div>
                                        </ChatBubble>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    { /* Render the following only on smaller devices */}
                    <div className="xl:hidden max-w-2xl mt-2">
                        <div>
                            <div className="embla" ref={emblaRef}>
                                <div className="embla__container">

                                    {apiResponse.locations.map((location, index) => (
                                        <div key={`Slide: ${index}`} className="embla__slide p-3 mr-1 bg-white rounded-box space-y-3" >
                                             <LocationInfoPanel location={location} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-center items-center w-full py-2">
                                {apiResponse.locations.map((_, index) => (
                                    <button key={`Button: ${index}`} className={`text-xl ${currentSlideIndex === index ? "text-primary" : "text-gray-400"}`}>
                                        <RxDotFilled />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div >

    )
}

export default ApiResponse;