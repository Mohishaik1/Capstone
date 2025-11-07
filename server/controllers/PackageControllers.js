import express from 'express';

import packageModel from '../models/PackageModel.js';

const router = express.Router();

router.post('/addpackage', async (req, res) => {
    try {
    //  Saves data except _id field if provided
      const { _id, ...packageDataWithoutId } = req.body;
      
      const packageData = new packageModel(packageDataWithoutId);
      await packageData.save();
      res.status(200).json({ success: "Package added successfully", package: packageData });
    } catch (error) {
        console.log('Error adding package:', error);
        
        // Check if it's a duplicate key error
        if (error.code === 11000) {
          const field = Object.keys(error.keyPattern || {})[0];
          return res.status(400).json({ 
            error: "Duplicate key error", 
            details: `A package with this ${field} already exists. Please use a different ${field}.`,
            field: field
          });
        }
        
        res.status(500).json({ error: "Failed to add package", details: error.message });
    }
});

router.get('/addpackages', async (req, res) => {
    try {
        const packages = await packageModel.find().sort({ created: -1 });
        res.status(200).json(packages);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch packages" });
    }
});

router.put('/updatepackage/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPackage = await packageModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedPackage) {
            return res.status(404).json({ error: "Package not found" });
        }
        res.status(200).json({ success: "Package updated successfully", package: updatedPackage });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update package" });
    }
});

router.delete('/deletepackage/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPackage = await packageModel.findByIdAndDelete(id);
        if (!deletedPackage) {
            return res.status(404).json({ error: "Package not found" });
        }
        res.status(200).json({ success: "Package deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete package" });
    }
});

export default router;