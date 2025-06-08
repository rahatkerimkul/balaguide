import { Search, ChevronLeft, ChevronRight, Plus, Filter, Users } from "lucide-react"

const AllSchedulesPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
            <div className="w-full">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">All Group Schedules</h1>
                            <p className="text-gray-600">Manage and view all programming course schedules</p>
                        </div>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center">
                            <Plus className="h-5 w-5 mr-2" />
                            Create Schedule
                        </button>
                    </div>

                    {/* Search and Filters */}
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search courses or teachers..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                            <option>All Groups</option>
                            <option>Group A</option>
                            <option>Group B</option>
                            <option>Group C</option>
                        </select>

                        <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                            <option>All Teachers</option>
                            <option>John Smith</option>
                            <option>Sarah Johnson</option>
                        </select>

                        <button className="border border-gray-300 rounded-lg px-3 py-2 flex items-center text-gray-700 hover:bg-gray-50">
                            <Filter className="h-4 w-4 mr-2" />
                            More Filters
                        </button>
                    </div>

                    {/* Calendar Navigation */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex space-x-2">
                            <button className="border border-gray-300 rounded-lg px-4 py-2 flex items-center text-gray-700 hover:bg-gray-50">
                                <ChevronLeft className="h-4 w-4 mr-1" />
                                Previous
                            </button>
                            <button className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50">
                                Today
                            </button>
                            <button className="border border-gray-300 rounded-lg px-4 py-2 flex items-center text-gray-700 hover:bg-gray-50">
                                Next
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </button>
                        </div>
                        <div className="text-gray-700 font-medium">June 08 - 14</div>
                    </div>

                    {/* Schedule Table */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        {/* Table Header */}
                        <div className="grid grid-cols-8 border-b border-gray-200">
                            <div className="p-4 font-medium text-gray-700">Time</div>
                            <div className="p-4 text-center border-l border-gray-200">
                                <div className="font-medium">Mon</div>
                                <div className="text-xs text-gray-500">09</div>
                            </div>
                            <div className="p-4 text-center border-l border-gray-200">
                                <div className="font-medium">Tue</div>
                                <div className="text-xs text-gray-500">10</div>
                            </div>
                            <div className="p-4 text-center border-l border-gray-200">
                                <div className="font-medium">Wed</div>
                                <div className="text-xs text-gray-500">11</div>
                            </div>
                            <div className="p-4 text-center border-l border-gray-200">
                                <div className="font-medium">Thu</div>
                                <div className="text-xs text-gray-500">12</div>
                            </div>
                            <div className="p-4 text-center border-l border-gray-200">
                                <div className="font-medium">Fri</div>
                                <div className="text-xs text-gray-500">13</div>
                            </div>
                            <div className="p-4 text-center border-l border-gray-200">
                                <div className="font-medium">Sat</div>
                                <div className="text-xs text-gray-500">14</div>
                            </div>
                            <div className="p-4 text-center border-l border-gray-200">
                                <div className="font-medium">Sun</div>
                                <div className="text-xs text-gray-500">15</div>
                            </div>
                        </div>

                        {/* Time Slots */}
                        {/* 8:00 AM */}
                        <div className="grid grid-cols-8 border-b border-gray-200 min-h-[80px]">
                            <div className="p-4 text-gray-700 flex items-center">8:00 AM</div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                        </div>

                        {/* 9:00 AM */}
                        <div className="grid grid-cols-8 border-b border-gray-200 min-h-[80px]">
                            <div className="p-4 text-gray-700 flex items-center">9:00 AM</div>
                            <div className="border-l border-gray-200 p-2">
                                <div className="bg-blue-500 text-white p-2 rounded-md">
                                    <div className="font-medium">Python Basics</div>
                                    <div className="text-xs">Group A</div>
                                    <div className="text-xs">John Smith</div>
                                    <div className="flex items-center text-xs mt-1">
                                        <Users className="h-3 w-3 mr-1" />
                                        <span>12</span>
                                    </div>
                                </div>
                            </div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                        </div>

                        {/* 10:00 AM */}
                        <div className="grid grid-cols-8 border-b border-gray-200 min-h-[80px]">
                            <div className="p-4 text-gray-700 flex items-center">10:00 AM</div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200 p-2">
                                <div className="bg-orange-500 text-white p-2 rounded-md">
                                    <div className="font-medium">Data Structures</div>
                                    <div className="text-xs">Group A</div>
                                    <div className="text-xs">John Smith</div>
                                    <div className="flex items-center text-xs mt-1">
                                        <Users className="h-3 w-3 mr-1" />
                                        <span>12</span>
                                    </div>
                                </div>
                            </div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                        </div>

                        {/* 11:00 AM */}
                        <div className="grid grid-cols-8 border-b border-gray-200 min-h-[80px]">
                            <div className="p-4 text-gray-700 flex items-center">11:00 AM</div>
                            <div className="border-l border-gray-200 p-2">
                                <div className="bg-green-500 text-white p-2 rounded-md">
                                    <div className="font-medium">JavaScript Advanced</div>
                                    <div className="text-xs">Group B</div>
                                    <div className="text-xs">Sarah Johnson</div>
                                    <div className="flex items-center text-xs mt-1">
                                        <Users className="h-3 w-3 mr-1" />
                                        <span>8</span>
                                    </div>
                                </div>
                            </div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                        </div>

                        {/* 12:00 PM */}
                        <div className="grid grid-cols-8 border-b border-gray-200 min-h-[80px]">
                            <div className="p-4 text-gray-700 flex items-center">12:00 PM</div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                        </div>

                        {/* 1:00 PM */}
                        <div className="grid grid-cols-8 border-b border-gray-200 min-h-[80px]">
                            <div className="p-4 text-gray-700 flex items-center">1:00 PM</div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                        </div>

                        {/* 2:00 PM */}
                        <div className="grid grid-cols-8 border-b border-gray-200 min-h-[80px]">
                            <div className="p-4 text-gray-700 flex items-center">2:00 PM</div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200 p-2">
                                <div className="bg-purple-500 text-white p-2 rounded-md">
                                    <div className="font-medium">React Fundamentals</div>
                                    <div className="text-xs">Group C</div>
                                    <div className="text-xs">Mike Wilson</div>
                                    <div className="flex items-center text-xs mt-1">
                                        <Users className="h-3 w-3 mr-1" />
                                        <span>15</span>
                                    </div>
                                </div>
                            </div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                        </div>

                        {/* 3:00 PM */}
                        <div className="grid grid-cols-8 border-b border-gray-200 min-h-[80px]">
                            <div className="p-4 text-gray-700 flex items-center">3:00 PM</div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200 p-2">
                                <div className="bg-pink-500 text-white p-2 rounded-md">
                                    <div className="font-medium">Web Design</div>
                                    <div className="text-xs">Group D</div>
                                    <div className="text-xs">Emma Davis</div>
                                    <div className="flex items-center text-xs mt-1">
                                        <Users className="h-3 w-3 mr-1" />
                                        <span>10</span>
                                    </div>
                                </div>
                            </div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                        </div>

                        {/* 4:00 PM */}
                        <div className="grid grid-cols-8 border-b border-gray-200 min-h-[80px]">
                            <div className="p-4 text-gray-700 flex items-center">4:00 PM</div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200 p-2">
                                <div className="bg-indigo-500 text-white p-2 rounded-md">
                                    <div className="font-medium">Algorithm Design</div>
                                    <div className="text-xs">Group A</div>
                                    <div className="text-xs">John Smith</div>
                                    <div className="flex items-center text-xs mt-1">
                                        <Users className="h-3 w-3 mr-1" />
                                        <span>12</span>
                                    </div>
                                </div>
                            </div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                        </div>

                        {/* 5:00 PM */}
                        <div className="grid grid-cols-8 border-b border-gray-200 min-h-[80px]">
                            <div className="p-4 text-gray-700 flex items-center">5:00 PM</div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200"></div>
                            <div className="border-l border-gray-200 p-2">
                                <div className="bg-teal-500 text-white p-2 rounded-md">
                                    <div className="font-medium">Database Design</div>
                                    <div className="text-xs">Group C</div>
                                    <div className="text-xs">Mike Wilson</div>
                                    <div className="flex items-center text-xs mt-1">
                                        <Users className="h-3 w-3 mr-1" />
                                        <span>15</span>
                                    </div>
                                </div>
                            </div>
                            <div className="border-l border-gray-200"></div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="flex justify-between mt-6">
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                                <span className="text-sm text-gray-600">Python Courses</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                <span className="text-sm text-gray-600">JavaScript Courses</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                                <span className="text-sm text-gray-600">React Courses</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                                <span className="text-sm text-gray-600">Data Structure Courses</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-pink-500 rounded-full mr-2"></div>
                                <span className="text-sm text-gray-600">Design Courses</span>
                            </div>
                        </div>
                        <div className="text-sm text-gray-600">Total Classes: 7 | Total Students: 84</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllSchedulesPage
