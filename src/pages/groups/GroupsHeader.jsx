"use client"
import { BiPlus, BiSearch, BiFilter } from "react-icons/bi"

const GroupsHeader = ({ onCreateGroup, searchTerm, onSearchChange, filterStatus, onFilterChange, groupsCount }) => {
    return (
        <div className="groups-header">
            <div className="header-title-section">
                <h1 className="page-title">Группы</h1>
                <span className="groups-count">{groupsCount} групп</span>
            </div>

            <div className="header-controls">
                <div className="search-container">
                    <BiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Поиск групп..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="filter-container">
                    <BiFilter className="filter-icon" />
                    <select value={filterStatus} onChange={(e) => onFilterChange(e.target.value)} className="filter-select">
                        <option value="all">Все группы</option>
                        <option value="active">Активные</option>
                        <option value="full">Заполненные</option>
                        <option value="empty">Пустые</option>
                    </select>
                </div>

                <button className="create-btn" onClick={onCreateGroup}>
                    <BiPlus />
                    <span>Создать группу</span>
                </button>
            </div>
        </div>
    )
}

export default GroupsHeader
