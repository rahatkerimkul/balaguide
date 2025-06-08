// src/pages/GroupsPage.jsx
import React, {useEffect, useState} from "react";
import axiosInstance from "../../utils/axiosInstance";
import {useNavigate} from "react-router-dom";
import CreateGroupPage from "./CreateGroupPage";
import { BiBookOpen  } from "react-icons/bi";


const GroupsPage = () => {
    const [groups, setGroups] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const token = localStorage.getItem("token");
                const user = JSON.parse(localStorage.getItem("user"));
                const centerId = user?.id;

                const res = await axiosInstance.get(
                    `/api/v1/education-centers/${centerId}/groups`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setGroups(res.data.data); // потому что у тебя ApiResponse<>
            } catch (error) {
                console.error("Error fetching groups:", error);
            }
        };

        fetchGroups();
    }, [showModal]);


    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">All Groups</h2>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                    onClick={() => setShowModal(true)}
                >
                    ➕ Create Group
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 relative">
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                            onClick={() => setShowModal(false)}
                        >
                            ✖
                        </button>
                        <CreateGroupPage onSuccess={() => setShowModal(false)}/>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.map((group) => (
                    <div key={group.id} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-all">
                        <h3 className="text-lg font-semibold mb-2">{group.name}</h3>
                        <p><span className="font-medium">Language:</span> {group.language}</p>
                        <p>
                            <span
                                className="font-medium">Participants:</span> {group.currentParticipants} / {group.maxParticipants}
                        </p>
                        <p><span className="font-medium">Start Date:</span> {group.startEducationDate?.split("T")[0]}
                        </p>
                        <p>
                            <span className="font-medium">Course:</span>{" "}
                            <button
                                className="text-blue-600 hover:underline"
                                onClick={() => navigate(`/courses/${group.course?.id}`)}
                            >
                                {group.course?.name}
                            </button>
                        </p>
                        <p><span className="font-medium">Children:</span> {group.childrenEnrolled.length}</p>

                        {group.groupFull && (
                            <p className="text-red-600 font-bold mt-1">⚠ Group is full</p>
                        )}

                        <div className="mt-4 flex flex-col gap-2">
                            <button
                                className="bg-[#5463d6] text-white px-3 py-1 rounded-md hover:bg-[#4453c2]"
                                onClick={() => navigate(`/groups/${group.id}/lessons`)}>
                                <BiBookOpen className="inline mr-2" />
                                View Lessons
                            </button>
                            <button
                                className="bg-gray-700 text-white px-3 py-1 rounded-md hover:bg-gray-800"
                                onClick={() => navigate(`/groups/${group.id}`)}>
                                Group Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GroupsPage;