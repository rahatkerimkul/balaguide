"use client"

import { useEffect, useState } from "react"
import axiosInstance from "../../utils/axiosInstance"
import { useParams, useNavigate } from "react-router-dom"
import {
  FaDownload,
  FaUpload,
  FaCalendarAlt,
  FaArrowLeft,
  FaBookOpen,
  FaFileAlt,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa"
import { toast } from "react-toastify"
import "./group-lessons.css"

const GroupLessonsPage = () => {
  const { groupId } = useParams()
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploadingLessons, setUploadingLessons] = useState(new Set())
  const navigate = useNavigate()

  const fetchLessons = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      const res = await axiosInstance.get(`/api/v1/groups/${groupId}/lessons`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setLessons(res.data.data)
    } catch (error) {
      console.error("Error fetching lessons:", error)
      toast.error("Failed to load lessons")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLessons()
  }, [groupId])

  const handleDownload = async (lessonId, fileName) => {
    try {
      const token = localStorage.getItem("token")
      const res = await axiosInstance.get(`/api/v1/lessons/${lessonId}/download`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      })

      const blob = new Blob([res.data], { type: "application/pdf" })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", fileName)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)

      toast.success("File downloaded successfully!")
    } catch (error) {
      console.error("Download error:", error)
      toast.error("Failed to download the file")
    }
  }

  const handleUpload = async (lessonId, file) => {
    try {
      setUploadingLessons((prev) => new Set([...prev, lessonId]))

      const token = localStorage.getItem("token")
      const fileBytes = await file.arrayBuffer()
      const uint8Array = new Uint8Array(fileBytes)

      await axiosInstance.post(`/api/v1/lessons/${lessonId}/upload`, uint8Array, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/octet-stream",
        },
        params: { fileName: file.name },
      })

      toast.success("File uploaded successfully!")
      fetchLessons()
    } catch (err) {
      console.error("Upload error:", err)
      toast.error("Failed to upload the file")
    } finally {
      setUploadingLessons((prev) => {
        const newSet = new Set(prev)
        newSet.delete(lessonId)
        return newSet
      })
    }
  }

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch {
      return dateString
    }
  }

  if (loading) {
    return (
        <div className="group-lessons-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <span className="loading-text">Loading lessons...</span>
          </div>
        </div>
    )
  }

  return (
      <div className="group-lessons-container">
        <div className="lessons-header">
          <h1 className="lessons-title">
            <FaBookOpen className="lessons-title-icon" />
            Group #{groupId} Lessons
          </h1>
          <button className="back-button" onClick={() => navigate(-1)}>
            <FaArrowLeft />
            Back to Groups
          </button>
        </div>

        {lessons.length === 0 ? (
            <div className="empty-state">
              <FaFileAlt className="empty-state-icon" />
              <h3>No Lessons Found</h3>
              <p>This group doesn't have any lessons yet. Lessons will appear here once they're created.</p>
            </div>
        ) : (
            <div className="lessons-grid">
              {lessons.map((lesson) => (
                  <div key={lesson.id} className="lesson-card">
                    <div className="lesson-header">
                      <span className="lesson-number">Lesson {lesson.lessonNumber}</span>
                      <h3 className="lesson-title">{lesson.topic}</h3>
                      <p className="lesson-description">{lesson.description}</p>
                    </div>

                    <div className="lesson-date">
                      <FaCalendarAlt className="lesson-date-icon" />
                      <span>{formatDate(lesson.date)}</span>
                    </div>

                    <div className="lesson-actions">
                      {lesson.fileUrl ? (
                          <>
                            <button
                                onClick={() => handleDownload(lesson.id, lesson.fileUrl)}
                                className="file-action download-action"
                            >
                              <FaDownload className="action-icon" />
                              Download Materials
                            </button>

                            <label className="file-action reupload-action">
                              <FaUpload className="action-icon" />
                              {uploadingLessons.has(lesson.id) ? "Uploading..." : "Replace File"}
                              <input
                                  type="file"
                                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                                  className="file-input"
                                  onChange={(e) => {
                                    const file = e.target.files[0]
                                    if (file) handleUpload(lesson.id, file)
                                  }}
                                  disabled={uploadingLessons.has(lesson.id)}
                              />
                            </label>

                            <div className="file-status uploaded">
                              <FaCheckCircle />
                              <span>Materials available</span>
                            </div>
                          </>
                      ) : (
                          <>
                            <label className="file-action upload-action">
                              <FaUpload className="action-icon" />
                              {uploadingLessons.has(lesson.id) ? "Uploading..." : "Upload Materials"}
                              <input
                                  type="file"
                                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                                  className="file-input"
                                  onChange={(e) => {
                                    const file = e.target.files[0]
                                    if (file) handleUpload(lesson.id, file)
                                  }}
                                  disabled={uploadingLessons.has(lesson.id)}
                              />
                            </label>

                            <div className="file-status no-file">
                              <FaExclamationCircle />
                              <span>No materials uploaded</span>
                            </div>
                          </>
                      )}
                    </div>
                  </div>
              ))}
            </div>
        )}
      </div>
  )
}

export default GroupLessonsPage
