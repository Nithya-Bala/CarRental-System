import { useEffect,useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function UploadVehicle(){
  const location = useLocation();
  const navigate = useNavigate();
  const editVehicle = location.state?.vehicle;

  const [vehicleData, setVehicleData] = useState({
    make: "",
    model: "",
    releaseYear: "",
    dailyRate: "",
    vehicleStatus: "available", // default option
    passengerCapacity: "",
    engineCapacity: "",
    image: null,
  });

  useEffect(() => {
    if (editVehicle) {
      setVehicleData({
        ...editVehicle,
        image: null, // Can't prefill the image
      });
    }
  }, [editVehicle]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setVehicleData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  function handleClean(){
    setVehicleData({
    make: "",
    model: "",
    releaseYear: "",
    dailyRate: "",
    vehicleStatus: "available", 
    passengerCapacity: "",
    engineCapacity: "",
    image: null,
  })

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in vehicleData) {
      form.append(key, vehicleData[key]);
    }

    try {
      if (editVehicle) {
        // Update mode
        const res = await axios.put(`http://127.0.0.1:5000/vehicle/${editVehicle.vehicleID}`, form);
        alert(res.data.message);
      } else {
        // Upload mode
        const res = await axios.post("http://127.0.0.1:5000/vehicle", form);
        alert(res.data.message);
      }

      handleClean();
      navigate('/admin/manage');
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload/update vehicle");
    }
  };

  function handleCancel(){
    handleClean();
    navigate('/admin/manage');
  }

  return (
    <div className="form-container uploadvehicle-container d-flex align-items-center justify-content-center  py-5">
      <div className="card form-card upload-vehicle-card   shadow-lg">
        <div className="card-body">
          <h2 className="text-center mb-4">{editVehicle? "Edit Vehicle" : "Upload Vehicle" }</h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data" >
            <div className="mb-3">
              <input type="text" name="make" value={vehicleData.make} placeholder="Make" onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <input type="text" name="model" value={vehicleData.model} placeholder="Model" onChange={handleChange} className="form-control"  required />
            </div>
            <div className="mb-3">
             <input type="text" name="releaseYear" value={vehicleData.releaseYear} placeholder="Release Year" onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
             <input type="number" name="dailyRate" value={vehicleData.dailyRate} placeholder="Daily Rate" min={1500} step={100} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
             <select name="vehicleStatus" onChange={handleChange} className="form-control" required>
              <option value="available">Available</option>
              <option value="notAvailable">Not Available</option>
            </select>
            </div>
            <div className="mb-3">
             <input type="number" name="passengerCapacity" value={vehicleData.passengerCapacity} min={1} max={8} placeholder="Passenger Capacity" onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
             <input type="text" name="engineCapacity" value={vehicleData.engineCapacity} placeholder="Engine Capacity" onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
               <input type="file" name="image" accept="image/*" onChange={handleChange} required />
            </div>
            
            {
              editVehicle ?
              <div className="profile-btn d-flex gap-3 mt-2">
                <button type="submit" className="btn btn-submit">Update</button>
                <button className="btn btn-cancel" onClick={handleCancel} >Cancel</button>
              </div> :
              <div>
                <button className="btn btn-primary" type="submit">Upload</button>
              </div>
            }
          </form>
        </div>

      </div>
    </div>
  );
}

export default UploadVehicle;
